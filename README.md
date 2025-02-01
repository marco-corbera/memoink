# MemoInk

## Overview
MemoInk is a note-taking application designed for efficient organization and categorization of notes. The project follows a structured approach to both frontend and backend development, leveraging AI tools for planning and implementation.

## Process Summary
1. **Review Requirements**: Analyzed the video specifications to extract functional needs.
2. **Analyze Figma Designs & Style Guide**: Ensured alignment with the design system before implementation.
3. **Use AI Assistants**: 
   - Used **v0** for initial frontend planning.
   - Used **ChatGPT** for refining and troubleshooting.
4. **Identify Key Flows & Edge Cases**: Defined core user interactions and handled exceptions using AI discussion.
5. **Plan Frontend Structure**:
   - Defined folder structure and component hierarchy.
   - Followed **Atomic Design** principles for modular UI components.
6. **Plan Backend Models**:
   - Designed database schema to support note storage and categorization.
7. **Define Backend Architecture**:
   - Structured views, serializers, models, and URLs.
   - Ensured maintainability and scalability.
8. **Iterate with AI Assistants**:
   - **v0**: Initial scaffolding and layout setup.
   - **ChatGPT**: Assisted in implementation, debugging, and refinement.
9. **Use Copilot for Faster Development**: 
   - Autocompletion for repetitive patterns.
   - Enhanced efficiency in writing React and Django code.
10. **Leverage Warp AI for Terminal Debugging**:
    - Assisted in resolving environment and configuration issues.

---

## Key Design and Technical Decisions

### **Frontend Architecture**
- **Component-Based Structure**: Used **Atomic Design principles** where necessary, ensuring separation of UI concerns.
- **Routing & Navigation**:
  - Next.js `pages` structure for different views (`notes`, `category`, `editor`).
  - Used `useSearchParams` and `usePathname` for dynamic filtering.
- **State Management**:
  - Initially considered using `Context API` for global state management.
  - Decided **not to use Context API** because each page manages its own state independently.
  - Each component fetches and updates its data directly, avoiding unnecessary global state.
  - If future requirements demand cross-component communication, a global state solution like **Context API, Redux, or Zustand** could be reconsidered.
- **API Calls**:
  - Used a **service layer** (`services/notes.ts`) to abstract API interactions.
  - Implemented **debounced updates** for saving notes efficiently.
  
### **Backend Architecture**
- **Django + Django REST Framework (DRF)** for structured API development.
- **Model-View-Serializer Pattern**:
  - Models: Defined `Note` model with user ownership and categories.
  - Views: Used `ViewSet` for CRUD operations.
  - Serializers: Separate serializers for **detailed vs. preview responses**.
- **Filtering & Query Parameters**:
  - Implemented `/notes/?category=XYZ` for filtered fetching.
  - Added `/notes/summary/` endpoint for category statistics.
- **Authentication & Authorization**:
  - Used `IsAuthenticated` permission to restrict note access per user.
  - Implemented token-based authentication.
  
### **Testing Strategy**
- **Frontend Tests**:
  - Used **Jest & React Testing Library** for unit tests.
  - Mocked API requests for testing components in isolation.
- **Backend Tests**:
  - Used Django’s `TestCase` to verify model behavior.
  - Wrote API tests for CRUD operations and filtering.

---

## AI Tools Used
### **v0 (Generated UI & Initial Plan)**
- Used for scaffolding and component structure setup.
- Helped with initial file structure and project planning.

### **ChatGPT (Development & Debugging)**
- Used iteratively throughout development.
- Assisted in API design, UI refinements, and debugging.

### **GitHub Copilot (Code Suggestions & Speed Optimization)**
- Used in VSCode for rapid function and component writing.

### **Warp AI (Terminal Debugging & Config Fixes)**
- Assisted in resolving Docker & dependency errors.

---

## How to Run the Project
### **Frontend**
```sh
docker compose up --build
```

### **Run Tests**
#### Frontend
```sh
docker compose exec frontend npm run test
```
#### Backend
```sh
docker compose exec backend python manage.py test
```

