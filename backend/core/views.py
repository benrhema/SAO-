from rest_framework import viewsets
from .models import (
    NewsArticle,
    DonationTier,
    Donation,
    DonationFAQ,
    PartnerCategory,
    Partner,
    PartnerTestimonial,
    MediaVideo,
    DownloadableResource,
    FormSubmission,
)
from .serializers import (
    NewsArticleSerializer,
    DonationTierSerializer,
    DonationSerializer,
    DonationFAQSerializer,
    PartnerCategorySerializer,
    PartnerSerializer,
    PartnerTestimonialSerializer,
    MediaVideoSerializer,
    DownloadableResourceSerializer,
    FormSubmissionSerializer,
)


class NewsArticleViewSet(viewsets.ModelViewSet):
    queryset = NewsArticle.objects.filter(is_published=True)
    serializer_class = NewsArticleSerializer


class DonationTierViewSet(viewsets.ModelViewSet):
    queryset = DonationTier.objects.all()
    serializer_class = DonationTierSerializer


class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer


class DonationFAQViewSet(viewsets.ModelViewSet):
    queryset = DonationFAQ.objects.all()
    serializer_class = DonationFAQSerializer


class PartnerCategoryViewSet(viewsets.ModelViewSet):
    queryset = PartnerCategory.objects.all()
    serializer_class = PartnerCategorySerializer


class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer


class PartnerTestimonialViewSet(viewsets.ModelViewSet):
    queryset = PartnerTestimonial.objects.all()
    serializer_class = PartnerTestimonialSerializer


class MediaVideoViewSet(viewsets.ModelViewSet):
    queryset = MediaVideo.objects.all()
    serializer_class = MediaVideoSerializer


class DownloadableResourceViewSet(viewsets.ModelViewSet):
    queryset = DownloadableResource.objects.all()
    serializer_class = DownloadableResourceSerializer


class FormSubmissionViewSet(viewsets.ModelViewSet):
    queryset = FormSubmission.objects.all()
    serializer_class = FormSubmissionSerializer