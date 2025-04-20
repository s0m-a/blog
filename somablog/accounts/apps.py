from django.apps import AppConfig


class AccountsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "accounts"
    """
    connecting the profilensignals in my apps.py:
    """
    def ready(self):
        import accounts.signals