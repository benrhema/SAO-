from django.utils import timezone
from django.utils.text import slugify
from rest_framework import serializers
from .models import (
    SiteSettings,
    TeamMember,
    AboutValue,
    AboutStat,
    SuccessStory,
    ImpactStat,
    Program,
    VolunteerOpportunity,
    VolunteerItem,
    UpcomingEvent,
    PastEvent,
    PhotoGallery,
    DonateStat,
    DonatePaymentMethod,
    ContactInfo,
    DonateBank,
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


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = '__all__'


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'


class AboutValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutValue
        fields = '__all__'


class AboutStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutStat
        fields = '__all__'


class SuccessStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SuccessStory
        fields = '__all__'


class ImpactStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImpactStat
        fields = '__all__'


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'


class VolunteerOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerOpportunity
        fields = '__all__'


class VolunteerItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerItem
        fields = '__all__'


class UpcomingEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpcomingEvent
        fields = '__all__'


class PastEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = PastEvent
        fields = '__all__'


class PhotoGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoGallery
        fields = '__all__'


class DonateStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonateStat
        fields = '__all__'


class DonatePaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonatePaymentMethod
        fields = '__all__'


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'


class DonateBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonateBank
        fields = '__all__'


class NewsArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = '__all__'
        extra_kwargs = {'slug': {'required': False, 'allow_blank': True}}

    def _unique_slug(self, title, slug):
        base = slug or slugify(title)[:240] or 'article'
        base = slugify(base)[:240] or 'article'
        candidate = base
        i = 1
        qs = NewsArticle.objects.all()
        if self.instance is not None:
            qs = qs.exclude(pk=self.instance.pk)
        while qs.filter(slug=candidate).exists():
            i += 1
            candidate = f"{base}-{i}"
        return candidate

    def create(self, validated_data):
        validated_data['slug'] = self._unique_slug(validated_data.get('title', ''), validated_data.get('slug'))
        if not validated_data.get('published_at'):
            validated_data['published_at'] = timezone.now()
        validated_data.setdefault('is_published', True)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'slug' in validated_data and not validated_data['slug']:
            validated_data['slug'] = self._unique_slug(validated_data.get('title', instance.title), None)
        return super().update(instance, validated_data)


class DonationTierSerializer(serializers.ModelSerializer):
    impact = serializers.CharField(source='impact_description')

    class Meta:
        model = DonationTier
        fields = ['id', 'amount', 'impact', 'display_order']


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'payment_status', 'transaction_reference')


class DonationFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonationFAQ
        fields = '__all__'


class PartnerCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerCategory
        fields = '__all__'


class PartnerSerializer(serializers.ModelSerializer):
    category = serializers.CharField(help_text="Category name, e.g. Corporate, Government, NGO & Community")
    category_name = serializers.CharField(source='category.category_name', read_only=True)

    class Meta:
        model = Partner
        fields = ['id', 'name', 'abbreviation', 'sector_or_scope', 'partnership_since', 'logo_url', 'category', 'category_name', 'display_order']

    def _resolve_category(self, value):
        category, _ = PartnerCategory.objects.get_or_create(category_name=value)
        return category

    def create(self, validated_data):
        validated_data['category'] = self._resolve_category(validated_data.pop('category'))
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'category' in validated_data:
            validated_data['category'] = self._resolve_category(validated_data.pop('category'))
        return super().update(instance, validated_data)


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
