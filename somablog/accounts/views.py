from rest_framework.response import Response 
from rest_framework import status, generics, permissions
from .serializers import UserSerializer, LoginSerializers, ProfileSerializer, PublicProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from rest_framework.views import APIView
from .models import UserProfile
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import AuthenticationFailed

# Create your views here.
class RegisterUserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializers(data=request.data, context = {'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        response= Response({
            "username": user.username,
            "accesstoken": access_token,
            "message": "Login successful"
        }, status=status.HTTP_200_OK)
        
        response.set_cookie(
            key='access_token',
            value = access_token,
            httponly=True,
            secure=False, #change to true for production
            samesite='Lax',
            max_age= 1 * 3600,
        )
        
        response.set_cookie(
            key='refresh_token',
            value = str(refresh),
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=7 * 24 * 3600,
        )
        return response


class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Retrieve the token from the cookies
        token = request.COOKIES.get('access_token')
        if not token:
            print("No token provided")
            raise AuthenticationFailed('No token provided')

        try:
            # Validate the token using the inherited method from JWTAuthentication
            validated_token = self.get_validated_token(token)
        except Exception as e:
            raise AuthenticationFailed(f'Token is invalid: {str(e)}')

        # Return the user based on the validated token
        user = self.get_user(validated_token)
        return user, validated_token
  
    
  
class OwnProfileAPIView(generics.RetrieveUpdateAPIView):
    """
   RetrieveUpdateAPIView:This class-based view automatically provides the GET, PUT, and PATCH 
    methods to retrieve and update profiles.

    Args:
        generics (_type_): _description_

    Returns:
        _type_: _description_
    """
    serializer_class = ProfileSerializer
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        # Retrieve the profile for the authenticated user
        return self.request.user.profile
        
    def put(self, request,*args, **kwargs):
        #updating an existing profile
        profile = self.get_object() # retrieves the profile associated with the authenticated user
        serializer =  ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserProfileAPIView(APIView):
    def get(self, request, username):
        try:
            """
             In Django, the double underscore (__) notation is used to refer to related fields in queries, 
             making it easy to perform lookups on fields that are part of related models (such as ForeignKeys or OneToOne relationships).
            """
            user = UserProfile.objects.get(user__username=username) # Use 'user__username' for lookup
        except UserProfile.DoesNotExist:
            return Response({
                "detail": "user not found"
            }, status=404)
    
        if request.user.is_authenticated and request.user.username == username:
            serializer = ProfileSerializer(user)
        else:
            serializer = PublicProfileSerializer(user)
        return Response(serializer.data)
    


class CheckAuthAPIView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]
     
    def get(self, request):
        try:
            user = request.user
            return Response({
                "username": user.username,
                "email": user.email,
                "id": user.id,
            }, status=status.HTTP_200_OK)
        except AuthenticationFailed as e:
            return Response({
                "detail": f"Authentication failed: {str(e)}"
            }, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as error:
            return Response({
                "detail": "An error occurred during authentication"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class LogoutAPIView(APIView):
    def post(self, request):
        response = Response({
            'message': 'logged out successfully'
        }, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response

class RefreshTokenView(APIView): 
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        print("Refresh token received:", refresh_token)

        if refresh_token is None:
            return Response({'error': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            response = Response({"message": "Access token refreshed"}, status=status.HTTP_200_OK)
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=False,
                samesite='Lax',
                max_age=1 * 3600,
            )
            print(f"recieved response {response}")
            return response

        except TokenError:
            return Response({'error': 'Invalid or expired refresh token.'}, status=status.HTTP_401_UNAUTHORIZED)