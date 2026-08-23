
  # Website for Organization Updates

  This is a code bundle for Website for Organization Updates. The original project is available at https://www.figma.com/design/qMsOGz7rhijCAS6T9F5COG/Website-for-Organization-Updates.

  The site is a React (Vite) frontend backed by a Django REST API (`backend/`) — Django is
  the single source of truth for all content. There is no other backend.

  ## Running the code

  You need two terminals: one for the Django API, one for the Vite dev server.

  **Backend (Django)** — first time only:

  ```
  cd backend
  ../venv/Scripts/activate        # Windows; use `source ../venv/bin/activate` on macOS/Linux
  pip install -r requirements.txt
  python manage.py migrate
  python manage.py createsuperuser   # creates your admin login — pick your own username/password
  ```

  Then, every time:

  ```
  cd backend
  ../venv/Scripts/activate
  python manage.py runserver
  ```

  This serves the API at `http://localhost:8000`.

  **Frontend (Vite)**, in a second terminal:

  ```
  npm i
  npm run dev
  ```

  This serves the site at `http://localhost:5173` (Vite proxies `/api` requests to Django).

  ## Admin portal

  Visit `/admin` on the running site and log in with the superuser account you created above.
  From there you can edit every piece of content on the site — team, programs, events, news,
  partners, media, resources, donation settings, and more — plus view contact/volunteer form
  submissions and donations. Django's own built-in admin is also available at
  `http://localhost:8000/admin/` as a fallback.
  