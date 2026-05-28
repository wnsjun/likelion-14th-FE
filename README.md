# 멋쟁이사자처럼 홍익대학교 14기 공식 홈페이지

멋쟁이사자처럼 홍익대학교 14기의 공식 웹사이트입니다. 동아리 소개, 모집 안내, 활동 아카이브, 자주 묻는 질문 등을 제공합니다.

## 기술 스택

| 분류       | 기술                 |
| ---------- | -------------------- |
| Framework  | React 19             |
| Build Tool | Vite 7               |
| Styling    | Tailwind CSS 4       |
| Routing    | React Router DOM 7   |
| Font       | Pretendard           |
| Linting    | ESLint 9, Prettier 3 |
| Deployment | Vercel               |

## 프로젝트 구조

```
src/
├── assets/          # 이미지, 아이콘 등 정적 리소스
│   ├── apply/
│   ├── archive/
│   ├── home/
│   └── icon/
├── components/      # 재사용 가능한 컴포넌트
│   ├── admin/       # 어드민 대시보드 컴포넌트
│   ├── archive/     # 아카이브 섹션 컴포넌트
│   ├── events/      # 이벤트 페이지 컴포넌트
│   ├── faq/         # FAQ 컴포넌트
│   ├── home/        # 홈 페이지 컴포넌트
│   └── common/      # 공통 컴포넌트
├── data/            # 정적 데이터 파일
│   ├── TrackData.js
│   ├── ProjectData.js
│   └── ManagerData.js
├── layout/          # 레이아웃 컴포넌트
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ButtonApply.jsx
├── pages/           # 페이지 컴포넌트
│   ├── Home.jsx
│   ├── Events.jsx
│   ├── Archive.jsx
│   ├── Recruiting.jsx
│   ├── FAQ.jsx
│   ├── ApplyEnd.jsx
│   ├── admin/
│   └── applycheck/
├── styles/
│   └── typography.js
├── App.jsx          # 라우팅 설정
├── main.jsx         # 앱 진입점
└── index.css        # 전역 스타일 및 테마 변수
```

## 페이지 구성

| 경로               | 페이지         | 설명                                                        |
| ------------------ | -------------- | ----------------------------------------------------------- |
| `/`                | Home           | 메인 페이지 — 동아리 소개, 트랙 안내, 운영진 소개           |
| `/recruiting`      | Recruiting     | 모집 안내 — 일정, 지원 자격, 트랙별 정보                    |
| `/archive`         | Archive        | 활동 아카이브 — 프로젝트 목록(필터·페이지네이션), 활동 사진 |
| `/events`          | Events         | 연간 이벤트 일정 — 1학기·방학·2학기 타임라인                |
| `/faq`             | FAQ            | 자주 묻는 질문 — 공통·기획디자인·개발 카테고리별            |
| `/apply-check`     | ApplyCheck     | 지원 결과 조회 — 이름·코드 입력 후 합격·불합격 확인         |
| `/apply-end`       | ApplyEnd       | 모집 종료 안내                                              |
| `/admin/login`     | AdminLogin     | 어드민 로그인                                               |
| `/admin/dashboard` | AdminDashboard | 지원자 관리 대시보드                                        |

## 기능

### 홈 (`/`)
- 풀스크린 히어로 섹션 및 CTA 버튼
- 동아리·트랙·운영진 소개
- 모집 안내·아카이브 페이지 바로가기

### 모집 안내 (`/recruiting`)
- 모집 대상 및 일정 안내
- 트랙별(기획디자인·FE·BE) 소개
- 필참 행사 목록 및 지원하기 버튼

### 활동 아카이브 (`/archive`)
- 카테고리 필터링 + 페이지네이션이 적용된 프로젝트 카드 목록
- 카드 클릭 시 프로젝트 상세 정보 모달
- 가로 스크롤 활동 사진 갤러리

### 연간 이벤트 (`/events`)
- 1학기·방학·2학기로 구분된 연간 활동 일정 타임라인

### 자주 묻는 질문 (`/faq`)
- 카테고리별(공통·기획디자인·개발) Q&A 목록

### 지원 결과 조회 (`/apply-check`)
- 이름·코드 입력 → 로딩 → 합격/불합격 결과 표시 단계형 플로우

### 어드민 대시보드 (`/admin`)
- 트랙별 탭 필터 + 합격 단계별 체크박스 필터
- 지원자 목록 조회 및 합격 상태 토글
- 로그인 인증 후 접근 가능 (`PrivateRoute`)
