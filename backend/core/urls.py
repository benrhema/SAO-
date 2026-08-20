from rest_framework.routers import DefaultRouter
from .views import (
    NewsArticleViewSet,
    DonationTierViewSet,
    DonationViewSet,
    DonationFAQViewSet,
    PartnerCategoryViewSet,
    PartnerViewSet,
    PartnerTestimonialViewSet,
    MediaVideoViewSet,
    DownloadableResourceViewSet,
    FormSubmissionViewSet,
)

router = DefaultRouter()
router.register(r'news', NewsArticleViewSet, basename='news')
router.register(r'donation-tiers', DonationTierViewSet, basename='donation-tiers')
router.register(r'donations', DonationViewSet, basename='donations')
router.register(r'donation-faqs', DonationFAQViewSet, basename='donation-faqs')
router.register(r'partner-categories', PartnerCategoryViewSet, basename='partner-categories')
router.register(r'partners', PartnerViewSet, basename='partners')
router.register(r'partner-testimonials', PartnerTestimonialViewSet, basename='partner-testimonials')
router.register(r'media-videos', MediaVideoViewSet, basename='media-videos')
router.register(r'resources', DownloadableResourceViewSet, basename='resources')
router.register(r'form-submissions', FormSubmissionViewSet, basename='form-submissions')

urlpatterns = router.urls