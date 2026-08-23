from django.db import migrations


UNSPLASH_PERSON = 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
UNSPLASH_STORY = 'https://images.unsplash.com/photo-1612723203798-321285cf5e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
UNSPLASH_EVENT = 'https://images.unsplash.com/photo-1769867628840-0aae1c912a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
UNSPLASH_VIDEO = 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
UNSPLASH_VIDEO2 = 'https://images.unsplash.com/photo-1755548413928-4aaeba7c740e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
UNSPLASH_GALLERY = 'https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
UNSPLASH_GALLERY2 = 'https://images.unsplash.com/photo-1755548413928-4aaeba7c740e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'


def seed(apps, schema_editor):
    SiteSettings = apps.get_model('core', 'SiteSettings')
    TeamMember = apps.get_model('core', 'TeamMember')
    AboutValue = apps.get_model('core', 'AboutValue')
    AboutStat = apps.get_model('core', 'AboutStat')
    SuccessStory = apps.get_model('core', 'SuccessStory')
    ImpactStat = apps.get_model('core', 'ImpactStat')
    Program = apps.get_model('core', 'Program')
    VolunteerOpportunity = apps.get_model('core', 'VolunteerOpportunity')
    VolunteerItem = apps.get_model('core', 'VolunteerItem')
    UpcomingEvent = apps.get_model('core', 'UpcomingEvent')
    PastEvent = apps.get_model('core', 'PastEvent')
    PhotoGallery = apps.get_model('core', 'PhotoGallery')
    DonateStat = apps.get_model('core', 'DonateStat')
    DonatePaymentMethod = apps.get_model('core', 'DonatePaymentMethod')
    ContactInfo = apps.get_model('core', 'ContactInfo')
    DonateBank = apps.get_model('core', 'DonateBank')
    DonationTier = apps.get_model('core', 'DonationTier')
    MediaVideo = apps.get_model('core', 'MediaVideo')
    DownloadableResource = apps.get_model('core', 'DownloadableResource')

    SiteSettings.objects.create(
        site_name='Smile Again Organization',
        hero_title1='BE THE', hero_title2='CHANGE',
        hero_subtitle='Empowering communities through Education, Healthcare, and Sustainable Development.',
        hero_btn1='Learn More', hero_btn2='Our Mission',
        about_mission='Smile Again Foundation is dedicated to empowering individuals with disabilities and those living in poverty. We provide essential resources, education, healthcare, and sustainable development opportunities to help people overcome barriers and build better futures.',
        about_vision='We envision a world where everyone, regardless of their circumstances, has access to the resources and support they need to thrive. Through our programs, we aim to create lasting positive change in communities across the globe.',
        donate_suggested_amounts='25,50,100,250,500,1000',
    )

    team = [
        ('leadership', 'Founder & President', 'Founder & President', 'Leading SAO with passion and dedication to create lasting change in communities. With years of experience in social work and community development, our founder established SAO to address systemic challenges facing people with disabilities and those living in poverty.', '', 'founder@sao.org', '#', '', 0),
        ('leadership', 'Michael Chen', 'Executive Director', "Michael brings extensive experience in program development and community outreach, ensuring SAO's initiatives reach those who need them most.", UNSPLASH_PERSON, 'michael@sao.org', '#', '', 1),
        ('leadership', 'Dr. Aisha Patel', 'Medical Director', 'A passionate advocate for accessible healthcare, Dr. Patel oversees all health-related programs and medical partnerships.', UNSPLASH_PERSON, 'aisha@sao.org', '#', '', 2),
        ('leadership', 'James Rodriguez', 'Director of Operations', 'James ensures seamless coordination across all SAO programs, managing logistics, volunteers, and community partnerships.', UNSPLASH_PERSON, 'james@sao.org', '#', '', 3),
        ('board', 'Patricia Williams', 'Board Chair', '', UNSPLASH_PERSON, '', '', '', 0),
        ('board', 'David Kim', 'Board Treasurer', '', UNSPLASH_PERSON, '', '', '', 1),
        ('board', 'Maria Santos', 'Board Secretary', '', UNSPLASH_PERSON, '', '', '', 2),
        ('board', 'Robert Johnson', 'Board Member', '', UNSPLASH_PERSON, '', '', '', 3),
        ('board', 'Lisa Anderson', 'Board Member', '', UNSPLASH_PERSON, '', '', '', 4),
        ('board', 'Ahmed Hassan', 'Board Member', '', UNSPLASH_PERSON, '', '', '', 5),
        ('staff', 'Emily Martinez', 'Education Program Manager', '', '', '', '', 'Programs', 0),
        ('staff', 'Kevin Nguyen', 'Healthcare Coordinator', '', '', '', '', 'Healthcare', 1),
        ('staff', 'Sophie Thompson', 'Volunteer Coordinator', '', '', '', '', 'Community', 2),
        ('staff', 'Marcus Williams', 'Communications Director', '', '', '', '', 'Communications', 3),
        ('staff', 'Rachel Green', 'Fundraising Manager', '', '', '', '', 'Development', 4),
        ('staff', 'Daniel Lee', 'IT & Data Manager', '', '', '', '', 'Operations', 5),
    ]
    for t, name, role, bio, image, email, linkedin, dept, order in team:
        TeamMember.objects.create(type=t, name=name, role=role, bio=bio, image_url=image, email=email, linkedin=linkedin, department=dept, display_order=order)

    about_values = [
        ('Heart', 'COMPASSION', 'We believe in the power of empathy and understanding to transform lives.'),
        ('Users', 'COMMUNITY', 'Building stronger communities through collaboration and support.'),
        ('Lightbulb', 'INNOVATION', 'Finding creative solutions to tackle poverty and disability challenges.'),
        ('Target', 'IMPACT', 'Creating measurable, lasting change in the lives we touch.'),
    ]
    for i, (icon, title, desc) in enumerate(about_values):
        AboutValue.objects.create(icon=icon, title=title, description=desc, display_order=i)

    for i, (value, label) in enumerate([('10K+', 'Lives Impacted'), ('50+', 'Programs'), ('25+', 'Countries')]):
        AboutStat.objects.create(value=value, label=label, display_order=i)

    stories = [
        ('Maria Rodriguez', 'After losing my job during the pandemic, Smile Again Foundation helped me get back on my feet. They provided job training and connected me with a great employer. Now I can support my family again.', 'Job Training Program'),
        ('James Thompson', "The wheelchair and accessibility modifications they provided changed my life completely. I can now move independently and participate fully in my community. I'm forever grateful.", 'Disability Services'),
        ('Sarah Chen', "My daughter received a full scholarship through their education program. She's now the first person in our family to attend university. This foundation gave us hope for a better future.", 'Education Access'),
    ]
    for i, (name, story, program) in enumerate(stories):
        SuccessStory.objects.create(name=name, story=story, program=program, image_url=UNSPLASH_STORY, display_order=i)

    impact_stats = [
        (50000, 'MEALS SERVED', 'In the last year', '+'),
        (2500, 'PEOPLE TRAINED', 'New job skills acquired', '+'),
        (1200, 'CHILDREN EDUCATED', 'Scholarships provided', '+'),
        (800, 'MEDICAL VISITS', 'Free healthcare provided', '+'),
        (350, 'MOBILITY AIDS', 'Wheelchairs & devices', '+'),
        (95, 'SUCCESS RATE', 'Program completion', '%'),
    ]
    for i, (number, label, sublabel, suffix) in enumerate(impact_stats):
        ImpactStat.objects.create(number=number, label=label, sublabel=sublabel, suffix=suffix, display_order=i)

    programs = [
        ('GraduationCap', 'EDUCATION ACCESS', 'Providing free education, scholarships, and learning materials to underprivileged children and adults.', ['Free tutoring', 'School supplies', 'Scholarship programs', 'Adult literacy classes']),
        ('Stethoscope', 'HEALTHCARE SUPPORT', 'Offering medical care, mental health services, and health education to communities in need.', ['Free medical clinics', 'Mental health counseling', 'Health awareness', 'Medicine assistance']),
        ('Accessibility', 'DISABILITY SERVICES', 'Supporting individuals with disabilities through assistive devices, therapy, and advocacy.', ['Mobility aids', 'Physical therapy', 'Assistive technology', 'Rights advocacy']),
        ('Home', 'HOUSING ASSISTANCE', 'Helping families secure safe, affordable housing and providing home improvement support.', ['Emergency shelter', 'Rent assistance', 'Home repairs', 'Housing counseling']),
        ('Briefcase', 'JOB TRAINING', 'Empowering individuals with vocational training and employment opportunities.', ['Skills training', 'Job placement', 'Career counseling', 'Entrepreneurship support']),
        ('Apple', 'FOOD SECURITY', 'Ensuring access to nutritious food through food banks and community kitchens.', ['Food distribution', 'Community meals', 'Nutrition education', 'Agricultural training']),
    ]
    for i, (icon, title, desc, benefits) in enumerate(programs):
        Program.objects.create(icon=icon, title=title, description=desc, benefits=benefits, display_order=i)

    opportunities = [
        ('Community Outreach Volunteer', 'Help distribute food, clothing, and essential supplies to families in need.', 'Multiple Locations', 'Weekends, 4-6 hours', '10 positions available'),
        ('Education Tutor', 'Provide one-on-one tutoring and mentorship to students in our education programs.', 'Learning Centers', 'Flexible schedule', '15 positions available'),
        ('Healthcare Assistant', 'Support medical staff during free clinic days and health awareness campaigns.', 'Mobile Clinics', 'Monthly rotations', '5 positions available'),
        ('Event Coordinator', 'Help organize fundraising events, awareness campaigns, and community gatherings.', 'Remote/On-site', 'Project-based', '8 positions available'),
    ]
    for i, (title, desc, location, time, spots) in enumerate(opportunities):
        VolunteerOpportunity.objects.create(title=title, description=desc, location=location, time=time, spots=spots, display_order=i)

    requirements = [
        '18 years or older (some exceptions for youth programs)',
        'Commitment to serve for minimum 3 months',
        'Background check clearance',
        'Attend volunteer orientation session',
        'Maintain professional and compassionate demeanor',
    ]
    for i, text in enumerate(requirements):
        VolunteerItem.objects.create(kind='requirement', text=text, display_order=i)

    benefits = [
        'Make a real difference in your community',
        'Gain valuable skills and experience',
        'Meet like-minded individuals',
        'Volunteer certificates and references',
        'Professional development workshops',
        'Exclusive volunteer appreciation events',
    ]
    for i, text in enumerate(benefits):
        VolunteerItem.objects.create(kind='benefit', text=text, display_order=i)

    upcoming = [
        ('Annual Charity Gala 2026', 'Join us for an elegant evening of dining, entertainment, and fundraising to support our programs.', 'March 15, 2026', '6:00 PM - 11:00 PM', 'Grand Ballroom, City Convention Center', '500+ Expected', '$100 per ticket', True),
        ('Community Health Fair', 'Free health screenings, wellness workshops, and resources for the entire community.', 'February 22, 2026', '9:00 AM - 4:00 PM', 'Central Park Community Center', 'Open to All', 'FREE', False),
        ('5K Run for Hope', 'Participate in our annual charity run to raise awareness and funds for disability services.', 'April 8, 2026', '7:00 AM - 12:00 PM', 'Riverside Park', '300+ Registered', '$30 Registration', False),
        ('Youth Education Summit', 'A day of workshops, mentorship, and inspiration for students in our education programs.', 'May 5, 2026', '10:00 AM - 5:00 PM', 'Tech Innovation Hub', '150 Students', 'FREE for Students', False),
    ]
    for i, (title, desc, date, time, location, attendees, price, featured) in enumerate(upcoming):
        UpcomingEvent.objects.create(title=title, description=desc, date=date, time=time, location=location, attendees=attendees, price=price, image_url=UNSPLASH_EVENT, featured=featured, display_order=i)

    past = [
        ('Winter Clothing Drive 2025', '1,200+', '$45,000'),
        ('Back to School Fair 2025', '800+', '$32,000'),
        ('Thanksgiving Community Dinner', '2,000+', '$28,000'),
    ]
    for i, (title, participants, raised) in enumerate(past):
        PastEvent.objects.create(title=title, participants=participants, raised=raised, display_order=i)

    galleries = [
        ('Community Outreach 2025', 45, UNSPLASH_GALLERY),
        ('Health Fair Events', 32, UNSPLASH_GALLERY),
        ('School Programs', 58, UNSPLASH_GALLERY2),
        ('Volunteer Activities', 67, UNSPLASH_GALLERY),
    ]
    for i, (title, count, cover) in enumerate(galleries):
        PhotoGallery.objects.create(title=title, photo_count=count, cover_url=cover, display_order=i)

    donate_stats = [
        ('', 15000, '+', 'Donors'),
        ('$', 2, 'M+', 'Raised 2025'),
        ('', 98, '%', 'To Programs'),
        ('', 50000, '+', 'Lives Changed'),
    ]
    for i, (prefix, number, suffix, label) in enumerate(donate_stats):
        DonateStat.objects.create(prefix=prefix, number=number, suffix=suffix, label=label, display_order=i)

    payment_methods = [
        ('CreditCard', 'Credit/Debit Card', 'Secure online payment'),
        ('Building2', 'Bank Transfer', 'Direct bank deposit'),
        ('Smartphone', 'Mobile Money', 'M-Pesa, MTN, Airtel'),
    ]
    for i, (icon, name, desc) in enumerate(payment_methods):
        DonatePaymentMethod.objects.create(icon=icon, name=name, description=desc, display_order=i)

    ContactInfo.objects.create(
        address='123 Hope Street\nCommunity Center, Suite 456\nNew York, NY 10001',
        phone1='+1 (555) 123-4567', phone2='+1 (555) 987-6543',
        email1='info@smileagain.org', email2='support@smileagain.org',
        hours_mon='9:00 AM - 6:00 PM', hours_sat='10:00 AM - 4:00 PM', hours_sun='Closed',
        facebook='#', twitter='#', instagram='#', linkedin='#',
    )

    DonateBank.objects.create(
        bank_name='ABC Bank', account_name='Smile Again Organization',
        account_number='1234567890', swift='ABCXXX123', email='donations@sao.org',
    )

    impact_examples = [
        (25, 'Provides school supplies for 5 children'),
        (50, 'Feeds a family for one week'),
        (100, 'Provides medical care for 10 people'),
        (250, 'Funds job training for 2 individuals'),
        (500, 'Supports a wheelchair for someone in need'),
        (1000, 'Funds a month of education programs'),
    ]
    for i, (amount, impact) in enumerate(impact_examples):
        DonationTier.objects.create(amount=amount, impact_description=impact, display_order=i)

    videos = [
        ('all', 'SAO Impact Story 2025', "See how we've transformed lives across 25 countries in 2025", '5:24', 'Impact Story', '', True),
        ('all', 'Education Program Highlights', 'Students share their success stories from our education initiatives', '3:45', 'Programs', '', False),
        ('all', 'Healthcare in Action', 'Inside our mobile health clinics serving rural communities', '4:12', 'Healthcare', '', False),
        ('all', 'Volunteer Stories', 'Hear from volunteers making a difference every day', '2:58', 'Community', '', False),
        ('all', 'Annual Gala 2025 Recap', 'Highlights from our biggest fundraising event of the year', '6:30', 'Events', '', False),
        ('all', 'Disability Services Overview', 'Learn about our comprehensive disability support programs', '4:45', 'Programs', '', False),
        ('impact', "Maria's Journey to Independence", "How job training changed Maria's life and her family's future", '3:15', 'Impact Story', '', False),
        ('impact', "James' Story: Breaking Barriers", 'From wheelchair user to community advocate', '4:02', 'Impact Story', '', False),
        ('impact', 'Education Changed Everything', "Sarah's daughter becomes first in family to attend university", '3:45', 'Impact Story', '', False),
        ('impact', 'Healthcare Heroes in Rural Areas', 'Meet the team bringing medical care to remote communities', '5:10', 'Impact Story', '', False),
        ('impact', 'From Poverty to Prosperity', "A family's transformation through our comprehensive programs", '6:20', 'Impact Story', '', False),
        ('programs', 'Education Program Highlights 2025', 'Students share their success stories from our education initiatives', '3:45', 'Education', '', True),
        ('programs', 'Healthcare Mobile Clinics', 'Inside our mobile health clinics serving rural communities', '4:12', 'Healthcare', '', False),
        ('programs', 'Job Training Success', 'Meet graduates from our vocational training programs', '5:20', 'Job Training', '', False),
        ('programs', 'Disability Services Overview', 'Learn about our comprehensive disability support programs', '4:45', 'Disability Services', '', False),
        ('programs', 'Food Security Initiative', "How we're fighting hunger in underserved communities", '3:30', 'Food Security', '', False),
        ('programs', 'Housing Accessibility Program', 'Making homes accessible for people with disabilities', '4:15', 'Housing', '', False),
        ('events', 'Annual Gala 2025 Recap', 'Highlights from our biggest fundraising event of the year', '6:30', '', 'Jan 15, 2025', True),
        ('events', 'Community Health Fair', 'Providing free health screenings to 500+ community members', '4:20', '', 'Dec 10, 2024', False),
        ('events', 'Wheelchair Distribution Day', 'Delivering mobility devices to 50 individuals in need', '3:45', '', 'Nov 25, 2024', False),
        ('events', 'School Supplies Drive 2024', '1000+ students received backpacks and supplies', '5:15', '', 'Sep 1, 2024', False),
        ('events', 'Volunteer Appreciation Day', 'Celebrating our amazing volunteer team', '4:00', '', 'Aug 15, 2024', False),
        ('events', 'Food Distribution Drive', 'Emergency food relief for 200 families', '3:30', '', 'Jul 4, 2024', False),
    ]
    for section, title, desc, duration, category, date_label, featured in videos:
        thumb = UNSPLASH_VIDEO2 if title in ('Education Program Highlights 2025', 'School Supplies Drive 2024') else UNSPLASH_VIDEO
        MediaVideo.objects.create(
            section=section, title=title, description=desc, category=category,
            thumbnail_url=thumb, duration=duration, date_label=date_label, is_featured=featured,
        )

    resources = [
        ('report', 'Annual Impact Report 2025', '', 2025, '4.2 MB', 1234, ''),
        ('report', 'Annual Impact Report 2024', '', 2024, '3.8 MB', 2156, ''),
        ('report', 'Annual Impact Report 2023', '', 2023, '3.5 MB', 1890, ''),
        ('brochure', 'Organization Overview', "Learn about SAO's mission and programs", None, '2.1 MB', 0, ''),
        ('brochure', 'Volunteer Guide', 'Everything you need to know about volunteering', None, '1.8 MB', 0, ''),
        ('brochure', 'Partnership Opportunities', 'Ways to partner with SAO', None, '2.5 MB', 0, ''),
        ('brochure', 'Donor Impact Guide', 'See how your donations make a difference', None, '1.9 MB', 0, ''),
        ('media', 'Logo Pack', 'High-resolution logos in various formats', None, '5.2 MB', 0, 'ZIP'),
        ('media', 'Photo Library', 'High-quality photos from our programs', None, '45 MB', 0, 'ZIP'),
        ('media', 'Brand Guidelines', 'Official SAO branding standards', None, '3.1 MB', 0, 'PDF'),
        ('form', 'Volunteer Application', 'Apply to join our volunteer team', None, '', 0, ''),
        ('form', 'Partnership Inquiry', 'Express interest in partnering with SAO', None, '', 0, ''),
        ('form', 'Donation Receipt Request', 'Request a receipt for tax purposes', None, '', 0, ''),
        ('form', 'Program Enrollment', 'Enroll in our education or training programs', None, '', 0, ''),
    ]
    for i, (rtype, title, desc, year, size, downloads, ftype) in enumerate(resources):
        DownloadableResource.objects.create(
            resource_type=rtype, title=title, description=desc, year=year,
            file_size=size, download_count=downloads, file_type=ftype, display_order=i,
        )


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_aboutstat_aboutvalue_contactinfo_donatebank_and_more'),
    ]

    operations = [
        migrations.RunPython(seed, migrations.RunPython.noop),
    ]
