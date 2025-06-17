# Movie Bot Frontend

## 프로젝트 개요
Movie Bot은 영화 추천 및 채팅 서비스를 제공하는 웹 애플리케이션입니다. 사용자 인증, 영화 추천, 실시간 채팅 기능을 포함하고 있습니다.

## 기술 스택
- React 19.0.0
- React Router DOM 7.6.2
- Axios 1.7.9
- TailwindCSS 3.4.17
- Context API (상태 관리)

## 주요 기능
1. **사용자 인증**
   - 로그인/회원가입
   - JWT 기반 인증
   - 프로필 관리

2. **영화 추천**
   - 개인화된 영화 추천
   - 영화 상세 정보 조회

3. **채팅 기능**
   - 실시간 채팅
   - 영화 관련 대화

## 프로젝트 구조
```
frontend/
├── src/
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── contexts/       # Context API 관련 파일
│   ├── pages/         # 페이지 컴포넌트
│   ├── App.js         # 메인 애플리케이션 컴포넌트
│   └── index.js       # 진입점
├── public/            # 정적 파일
└── package.json       # 프로젝트 의존성 및 스크립트
```

## 시작하기

### 필수 조건
- Node.js (v14 이상)
- npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
npm start
```

### 프로덕션 빌드
```bash
npm run build
```

## 환경 변수
프로젝트를 실행하기 전에 다음 환경 변수를 설정해야 합니다:
- `REACT_APP_API_URL`: 백엔드 API 서버 URL

## 배포
- Netlify를 통한 자동 배포
- GitHub 저장소와 연동

## 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.
