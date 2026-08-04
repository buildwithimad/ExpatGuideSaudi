You are a senior software architect and Payload CMS expert.

Your task is to design and implement a production-ready enterprise CMS schema for a multilingual Saudi Arabia information portal called ExpatSaudi.

====================================================
PROJECT STACK
====================================================

Framework:

- Payload CMS 3.x
- Next.js 15
- TypeScript
- PostgreSQL
- Lexical Editor
- Payload Localization
- React 19

Current project structure:

src/
├── access/
├── collections/
│ ├── Articles/
│ ├── Categories/
│ ├── Media/
│ └── Users/
├── components/
├── fields/
├── globals/
├── hooks/
├── lib/
├── plugins/
├── utilities/
└── payload.config.ts

====================================================
IMPORTANT REQUIREMENTS
====================================================

DO NOT create simple tutorial schemas.

Build a production-grade CMS similar to large publishing platforms.

Use clean architecture.

Split every collection into its own folder.

Example:

Articles/
index.ts
access.ts
hooks.ts

Categories/
index.ts

Tags/
index.ts

Authors/
index.ts

====================================================
LOCALIZATION
====================================================

Use Payload Localization.

Supported locales:

English (default)
Arabic (RTL)
Urdu (RTL)
Hindi
Bengali
Tagalog

DO NOT create translation tables.

DO NOT create locale columns.

Use Payload localized fields.

Localized fields include:

title
subtitle
slug
summary
excerpt
description
content
seoTitle
seoDescription
ogTitle
ogDescription
bio
designation
question
answer

====================================================
COLLECTIONS
====================================================

Create the following collections.

1. Users
2. Authors
3. Categories
4. Tags
5. Articles
6. Tools
7. FAQs
8. GovernmentSources
9. NewsletterSubscribers
10. Media (already exists, improve if necessary)

====================================================
GLOBALS
====================================================

Create Globals:

SiteSettings
Homepage
Navigation
Footer
SeoDefaults

====================================================
RELATIONSHIPS
====================================================

Author

One Author
↓

Many Articles

---

Category

One Category
↓

Many Articles

---

Tag

Many Tags
↓

Many Articles

---

Article

One Article

belongs to

One Category

One Author

Many Tags

Many Related Articles

One Featured Image

One Hero Image

Many Government Sources

====================================================
ARTICLE SCHEMA
====================================================

Content

title (localized)
subtitle (localized)
slug (localized)
excerpt (localized)
summary (localized)
content (localized Lexical)

Media

featuredImage
heroImage
gallery

Relationships

category
author
tags
relatedArticles
governmentSources

Publishing

status

Draft
Review
SEO Review
Fact Check
Published
Archived

publishedAt
scheduledAt
updatedAt
lastVerifiedAt

featured
sticky
popular
latest

sortOrder

SEO

seoTitle
seoDescription
canonicalURL
ogTitle
ogDescription
ogImage

robots

noIndex
noFollow

Trust

verifiedBy
factChecked

officialSources

sourceLinks

reviewNotes

governmentDepartment

Analytics

readingTime
viewCount
likes
shares

AI

aiSummary

aiKeywords

needsReview

====================================================
CATEGORY SCHEMA
====================================================

name (localized)

slug (localized)

description (localized)

icon

color

parentCategory

featured

sortOrder

seoTitle (localized)

seoDescription (localized)

status

====================================================
TAG SCHEMA
====================================================

name (localized)

slug (localized)

description (localized)

color

featured

====================================================
AUTHOR SCHEMA
====================================================

name

slug

avatar

coverImage

bio (localized)

designation (localized)

specialization

experienceYears

linkedin

twitter

website

verified

featured

status

====================================================
TOOLS
====================================================

name (localized)

slug (localized)

description (localized)

icon

category

featured

status

====================================================
FAQ
====================================================

question (localized)

answer (localized)

category

featured

sortOrder

====================================================
GOVERNMENT SOURCES
====================================================

name

department

website

logo

priority

status

====================================================
NEWSLETTER
====================================================

email

locale

status

subscribedAt

====================================================
SITE SETTINGS
====================================================

siteName

tagline

logo

favicon

defaultSeo

socialLinks

contact

analytics

====================================================
REUSABLE FIELDS
====================================================

Create reusable field modules.

src/fields/

seo/
index.ts

slug/
index.ts

publish/
index.ts

richText/
index.ts

meta/
index.ts

Use these reusable fields across every collection.

Never duplicate SEO fields.

====================================================
ACCESS CONTROL
====================================================

Create access files for every collection.

Roles:

Super Admin

Admin

Editor

Author

Translator

Reviewer

SEO Manager

====================================================
HOOKS
====================================================

Automatically:

Generate slugs

Calculate reading time

Update lastModified

Populate publishedAt

Validate relationships

====================================================
BEST PRACTICES
====================================================

Use Payload relationship fields instead of storing IDs.

Use upload relationships for images.

Use indexes where appropriate.

Use enums instead of free text for status.

Use tabs inside the admin UI for:

Content

SEO

Publishing

Relations

Metadata

AI

Keep every file clean and modular.

====================================================
OUTPUT
====================================================

Generate production-ready TypeScript code.

Do not simplify.

Do not omit fields.

Do not leave TODOs.

Create all collections, globals, reusable fields, relationships, hooks, access control, and folder structure.

The code should be ready to compile inside a Payload CMS 3.x project.

====================================================
PUBLISHING
====================================================

Create a "display" group.

display

featured (boolean)

sticky (boolean)

Do NOT create:

latest
popular

Reason:

Latest must always be determined automatically by publishedAt.

Popular must always be determined automatically using analytics
(viewCount, shares, engagement).

Publishing fields:

status

Draft
Review
SEO Review
Fact Check
Published
Archived

publishedAt

scheduledAt

updatedAt

lastVerifiedAt

sortOrder
