from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    AdminUserViewSet,
    SiteSettingsViewSet,
    TeamMemberViewSet,
    AboutValueViewSet,
    AboutStatViewSet,
    SuccessStoryViewSet,
    ImpactStatViewSet,
    ProgramViewSet,
    VolunteerOpportunityViewSet,
    VolunteerItemViewSet,
    UpcomingEventViewSet,
    PastEventViewSet,
    PhotoGalleryViewSet,
    DonateStatViewSet,
    DonatePaymentMethodViewSet,
    ContactInfoViewSet,
    DonateBankViewSet,
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
    login_view,
    content_view,
    upload_view,
)

router = DefaultRouter(trailing_slash=False)
router.register(r'settings', SiteSettingsViewSet, basename='settings')
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'about-values', AboutValueViewSet, basename='about-values')
router.register(r'about-stats', AboutStatViewSet, basename='about-stats')
router.register(r'success-stories', SuccessStoryViewSet, basename='success-stories')
router.register(r'impact-stats', ImpactStatViewSet, basename='impact-stats')
router.register(r'programs', ProgramViewSet, basename='programs')
router.register(r'volunteer-opportunities', VolunteerOpportunityViewSet, basename='volunteer-opportunities')
router.register(r'volunteer-items', VolunteerItemViewSet, basename='volunteer-items')
router.register(r'upcoming-events', UpcomingEventViewSet, basename='upcoming-events')
router.register(r'past-events', PastEventViewSet, basename='past-events')
router.register(r'photo-galleries', PhotoGalleryViewSet, basename='photo-galleries')
router.register(r'donate-stats', DonateStatViewSet, basename='donate-stats')
router.register(r'donate-payment-methods', DonatePaymentMethodViewSet, basename='donate-payment-methods')
router.register(r'contact-info', ContactInfoViewSet, basename='contact-info')
router.register(r'donate-bank', DonateBankViewSet, basename='donate-bank')
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
router.register(r'admin-users', AdminUserViewSet, basename='admin-users')

urlpatterns = [
    path('content', content_view),
    path('auth/login', login_view),
    path('upload', upload_view),
] + router.urls
