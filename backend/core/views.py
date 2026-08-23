from django.contrib.auth import authenticate
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

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
from .permissions import IsAuthenticatedOrCreateOnly
from .serializers import (
    SiteSettingsSerializer,
    TeamMemberSerializer,
    AboutValueSerializer,
    AboutStatSerializer,
    SuccessStorySerializer,
    ImpactStatSerializer,
    ProgramSerializer,
    VolunteerOpportunitySerializer,
    VolunteerItemSerializer,
    UpcomingEventSerializer,
    PastEventSerializer,
    PhotoGallerySerializer,
    DonateStatSerializer,
    DonatePaymentMethodSerializer,
    ContactInfoSerializer,
    DonateBankSerializer,
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


# ---------------------------------------------------------------------------
# Content CRUD viewsets (public read, authenticated write)
# ---------------------------------------------------------------------------
class SiteSettingsViewSet(viewsets.ModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class AboutValueViewSet(viewsets.ModelViewSet):
    queryset = AboutValue.objects.all()
    serializer_class = AboutValueSerializer


class AboutStatViewSet(viewsets.ModelViewSet):
    queryset = AboutStat.objects.all()
    serializer_class = AboutStatSerializer


class SuccessStoryViewSet(viewsets.ModelViewSet):
    queryset = SuccessStory.objects.all()
    serializer_class = SuccessStorySerializer


class ImpactStatViewSet(viewsets.ModelViewSet):
    queryset = ImpactStat.objects.all()
    serializer_class = ImpactStatSerializer


class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer


class VolunteerOpportunityViewSet(viewsets.ModelViewSet):
    queryset = VolunteerOpportunity.objects.all()
    serializer_class = VolunteerOpportunitySerializer


class VolunteerItemViewSet(viewsets.ModelViewSet):
    queryset = VolunteerItem.objects.all()
    serializer_class = VolunteerItemSerializer


class UpcomingEventViewSet(viewsets.ModelViewSet):
    queryset = UpcomingEvent.objects.all()
    serializer_class = UpcomingEventSerializer


class PastEventViewSet(viewsets.ModelViewSet):
    queryset = PastEvent.objects.all()
    serializer_class = PastEventSerializer


class PhotoGalleryViewSet(viewsets.ModelViewSet):
    queryset = PhotoGallery.objects.all()
    serializer_class = PhotoGallerySerializer


class DonateStatViewSet(viewsets.ModelViewSet):
    queryset = DonateStat.objects.all()
    serializer_class = DonateStatSerializer


class DonatePaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = DonatePaymentMethod.objects.all()
    serializer_class = DonatePaymentMethodSerializer


class ContactInfoViewSet(viewsets.ModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer


class DonateBankViewSet(viewsets.ModelViewSet):
    queryset = DonateBank.objects.all()
    serializer_class = DonateBankSerializer


class NewsArticleViewSet(viewsets.ModelViewSet):
    serializer_class = NewsArticleSerializer

    def get_queryset(self):
        qs = NewsArticle.objects.all()
        if not (self.request.user and self.request.user.is_authenticated):
            qs = qs.filter(is_published=True)
        return qs


class DonationTierViewSet(viewsets.ModelViewSet):
    queryset = DonationTier.objects.all()
    serializer_class = DonationTierSerializer


class DonationFAQViewSet(viewsets.ModelViewSet):
    queryset = DonationFAQ.objects.all()
    serializer_class = DonationFAQSerializer


class PartnerCategoryViewSet(viewsets.ModelViewSet):
    queryset = PartnerCategory.objects.all()
    serializer_class = PartnerCategorySerializer


class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.select_related('category').all()
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


# ---------------------------------------------------------------------------
# PII-bearing viewsets: public create, admin-only read/update/delete
# ---------------------------------------------------------------------------
class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticatedOrCreateOnly]


class FormSubmissionViewSet(viewsets.ModelViewSet):
    queryset = FormSubmission.objects.all()
    serializer_class = FormSubmissionSerializer
    permission_classes = [IsAuthenticatedOrCreateOnly]


# ---------------------------------------------------------------------------
# Auth
# ---------------------------------------------------------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username', '')
    password = request.data.get('password', '')
    user = authenticate(request, username=username, password=password)
    if user is None:
        return Response({'error': 'Invalid username or password'}, status=401)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})


# ---------------------------------------------------------------------------
# Aggregated content for the public site — shaped to match the field names
# the React frontend's ContentProvider (src/lib/content.tsx) already expects.
# ---------------------------------------------------------------------------
def _serialize_video(v):
    return {
        'id': v.id,
        'featured': v.is_featured,
        'thumbnail': v.thumbnail_url,
        'title': v.title,
        'description': v.description,
        'duration': v.duration,
        'category': v.category,
        'date': v.date_label,
    }


@api_view(['GET'])
@permission_classes([AllowAny])
def content_view(request):
    settings_row = SiteSettings.objects.first()
    contact = ContactInfo.objects.first()
    bank = DonateBank.objects.first()

    suggested = []
    if settings_row and settings_row.donate_suggested_amounts:
        for part in settings_row.donate_suggested_amounts.split(','):
            part = part.strip()
            if part:
                try:
                    suggested.append(int(float(part)))
                except ValueError:
                    pass

    videos = list(MediaVideo.objects.all())
    resources = list(DownloadableResource.objects.all())

    data = {
        'settings': {
            'site_name': settings_row.site_name if settings_row else '',
            'hero_title1': settings_row.hero_title1 if settings_row else '',
            'hero_title2': settings_row.hero_title2 if settings_row else '',
            'hero_subtitle': settings_row.hero_subtitle if settings_row else '',
            'hero_btn1': settings_row.hero_btn1 if settings_row else '',
            'hero_btn2': settings_row.hero_btn2 if settings_row else '',
            'about_mission': settings_row.about_mission if settings_row else '',
            'about_vision': settings_row.about_vision if settings_row else '',
        },
        'team': [
            {
                'id': m.id, 'type': m.type, 'name': m.name, 'role': m.role, 'bio': m.bio,
                'image': m.image_url, 'email': m.email, 'linkedin': m.linkedin, 'department': m.department,
            }
            for m in TeamMember.objects.all()
        ],
        'partners': [
            {
                'id': p.id, 'name': p.name, 'abbreviation': p.abbreviation,
                'sector_or_scope': p.sector_or_scope, 'partnership_since': p.partnership_since,
                'logo_url': p.logo_url, 'category': str(p.category_id), 'category_name': p.category.category_name,
                'display_order': p.display_order,
            }
            for p in Partner.objects.select_related('category').all()
        ],
        'testimonials': [],
        'partner_testimonials': [
            {
                'id': t.id, 'quote': t.quote, 'author_name': t.author_name,
                'author_role': t.author_role, 'organization_name': t.organization_name,
            }
            for t in PartnerTestimonial.objects.all()
        ],
        'programs': [
            {'id': p.id, 'icon': p.icon, 'title': p.title, 'description': p.description, 'benefits': p.benefits}
            for p in Program.objects.all()
        ],
        'impact_stats': [
            {'id': s.id, 'number': s.number, 'label': s.label, 'sublabel': s.sublabel, 'suffix': s.suffix}
            for s in ImpactStat.objects.all()
        ],
        'success_stories': [
            {'id': s.id, 'name': s.name, 'story': s.story, 'program': s.program, 'image': s.image_url}
            for s in SuccessStory.objects.all()
        ],
        'volunteer_opportunities': [
            {
                'id': o.id, 'title': o.title, 'description': o.description,
                'location': o.location, 'time': o.time, 'spots': o.spots,
            }
            for o in VolunteerOpportunity.objects.all()
        ],
        'volunteer_requirements': [
            {'id': i.id, 'text': i.text} for i in VolunteerItem.objects.filter(kind=VolunteerItem.Kind.REQUIREMENT)
        ],
        'volunteer_benefits': [
            {'id': i.id, 'text': i.text} for i in VolunteerItem.objects.filter(kind=VolunteerItem.Kind.BENEFIT)
        ],
        'upcoming_events': [
            {
                'id': e.id, 'featured': e.featured, 'image': e.image_url, 'title': e.title,
                'description': e.description, 'date': e.date, 'time': e.time,
                'location': e.location, 'attendees': e.attendees, 'price': e.price,
            }
            for e in UpcomingEvent.objects.all()
        ],
        'past_events': [
            {'id': e.id, 'title': e.title, 'participants': e.participants, 'raised': e.raised}
            for e in PastEvent.objects.all()
        ],
        'news': [
            {
                'id': n.id, 'title': n.title, 'category': n.category, 'excerpt': n.excerpt,
                'image_url': n.image_url, 'published_at': n.published_at,
            }
            for n in NewsArticle.objects.filter(is_published=True)
        ],
        'media': {
            'all': [_serialize_video(v) for v in videos if v.section == MediaVideo.Section.ALL],
            'impact': [_serialize_video(v) for v in videos if v.section == MediaVideo.Section.IMPACT],
            'programs': [_serialize_video(v) for v in videos if v.section == MediaVideo.Section.PROGRAMS],
            'events': [_serialize_video(v) for v in videos if v.section == MediaVideo.Section.EVENTS],
        },
        'photo_galleries': [
            {'id': g.id, 'title': g.title, 'count': g.photo_count, 'cover': g.cover_url}
            for g in PhotoGallery.objects.all()
        ],
        'resources': {
            'reports': [
                {'id': r.id, 'title': r.title, 'year': r.year, 'size': r.file_size, 'downloads': r.download_count}
                for r in resources if r.resource_type == DownloadableResource.ResourceType.ANNUAL_REPORT
            ],
            'brochures': [
                {'id': r.id, 'title': r.title, 'description': r.description, 'size': r.file_size}
                for r in resources if r.resource_type == DownloadableResource.ResourceType.BROCHURE_GUIDE
            ],
            'media': [
                {'id': r.id, 'title': r.title, 'description': r.description, 'size': r.file_size, 'type': r.file_type}
                for r in resources if r.resource_type == DownloadableResource.ResourceType.MEDIA_KIT
            ],
            'forms': [
                {'id': r.id, 'title': r.title, 'description': r.description}
                for r in resources if r.resource_type == DownloadableResource.ResourceType.FORM_APPLICATION
            ],
        },
        'about_values': [
            {'id': v.id, 'icon': v.icon, 'title': v.title, 'description': v.description}
            for v in AboutValue.objects.all()
        ],
        'about_stats': [
            {'id': s.id, 'value': s.value, 'label': s.label} for s in AboutStat.objects.all()
        ],
        'contact_info': {
            'address': contact.address if contact else '',
            'phone1': contact.phone1 if contact else '',
            'phone2': contact.phone2 if contact else '',
            'email1': contact.email1 if contact else '',
            'email2': contact.email2 if contact else '',
            'hours_mon': contact.hours_mon if contact else '',
            'hours_sat': contact.hours_sat if contact else '',
            'hours_sun': contact.hours_sun if contact else '',
            'facebook': contact.facebook if contact else '',
            'twitter': contact.twitter if contact else '',
            'instagram': contact.instagram if contact else '',
            'linkedin': contact.linkedin if contact else '',
        },
        'donate_stats': [
            {'id': s.id, 'prefix': s.prefix, 'number': s.number, 'suffix': s.suffix, 'label': s.label}
            for s in DonateStat.objects.all()
        ],
        'donate_suggested_amounts': suggested,
        'donate_impact_examples': [
            {'id': t.id, 'amount': t.amount, 'impact': t.impact_description}
            for t in DonationTier.objects.all()
        ],
        'donate_payment_methods': [
            {'id': m.id, 'icon': m.icon, 'name': m.name, 'description': m.description}
            for m in DonatePaymentMethod.objects.all()
        ],
        'donate_bank': {
            'bank_name': bank.bank_name if bank else '',
            'account_name': bank.account_name if bank else '',
            'account_number': bank.account_number if bank else '',
            'swift': bank.swift if bank else '',
            'email': bank.email if bank else '',
        },
    }
    return Response(data)
