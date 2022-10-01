from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('web_app.api.urls')),
    path('account/', include('user_app.api.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
    path('docs/', include_docs_urls(title='GoldenMemesAPI')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

