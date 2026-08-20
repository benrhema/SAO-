from rest_framework import serializers
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


class NewsArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = '__all__'


class DonationTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonationTier
        fields = '__all__'


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'
        read_only_fields = ('id', 'created_at')


class DonationFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonationFAQ
        fields = '__all__'


class PartnerCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerCategory
        fields = '__all__'


class PartnerSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.category_name', read_only=True)

    class Meta:
        model = Partner
        fields = '__all__'


class PartnerTestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerTestimonial
        fields = '__all__'


class MediaVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaVideo
        fields = '__all__'


class DownloadableResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DownloadableResource
        fields = '__all__'


class FormSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormSubmission
        fields = '__all__'
        read_only_fields = ('id', 'submitted_at', 'status')