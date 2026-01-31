# PLAN

## Desired End State
- Astro 정적 사이트 완료
- 기능 유지: 홈, 글 목록, 글 상세, RSS, 404, Google Analytics, 폰트, 네비게이션, 첨부파일
- 콘텐츠: Astro Content Collections 기반
- 빌드/배포: 정적 빌드 성공

## 결정 사항
- 출력: 정적 사이트 생성
- URL: /posts/{slug} 유지
- 컴포넌트: Astro-only
- 콘텐츠: Content Collections, 스키마 필수(title/date/draft/slug)
- draft: draft=true 글 빌드 제외
- RSS: @astrojs/rss 사용
- 404: 정적 404.html 생성
- 스타일: Tailwind v4 + @tailwindcss/vite 사용

## 범위
- 프레임워크: React Router 제거, Astro 도입
- 라우팅: app/routes → src/pages
- 레이아웃/헤드: app/root.tsx 기능 이관
- 스타일: app/app.css + Tailwind 통합
- 데이터: Content Collections로 posts 읽기
- 빌드/스크립트: package.json, vite.config.ts, react-router.config.ts 정리
- 정적 파일: public, content 유지

## What We're Not Doing
- SSR/하이브리드 출력
- 디자인 리뉴얼/대규모 UI 변경
- CMS/외부 데이터 소스 도입
- URL 변경(/posts/{slug} 유지 전제)

## 작업 순서
### Phase 1: 초기 설정
1. 현재 상태 점검: 파일 구조, 라우트, 스크립트 목록 정리
2. Astro 설치 및 기본 구성 파일 생성
3. 패키지 정리: React Router 관련 제거, Astro/통합 패키지 추가
4. 설정 파일 정리: `astro.config.*`, `tsconfig.json`, `vite.config.ts` 정합성 확인

### Phase 2: 콘텐츠 컬렉션
1. `src/content.config.*` 생성
2. 컬렉션 정의: `posts` + schema(title/date/draft/slug)
3. 콘텐츠 경로 연결: 기존 `content/posts` 그대로 사용
4. draft 필터: 목록/피드/페이지 생성 시 제외

### Phase 3: 레이아웃/컴포넌트
1. 레이아웃: `src/layouts/BaseLayout.astro` (헤드/폰트/GA/네비)
2. 네비게이션: `src/components/GlobalNavigationBar.astro`
3. 글로벌 스타일: `src/styles/global.css`로 `app/app.css` 이관
4. Tailwind 통합: `@tailwindcss/vite` + typography 플러그인 설정

### Phase 4: 페이지/라우팅
1. 홈: `src/pages/index.astro`
2. 목록: `src/pages/posts/index.astro` (정렬: 최신순)
3. 상세: `src/pages/posts/[slug].astro`
4. 404: `src/pages/404.astro` (정적 404.html)

### Phase 5: RSS
1. `src/pages/rss.xml.ts` 생성
2. `@astrojs/rss`로 아이템 생성
3. 게시물 링크/날짜/타이틀 매핑 확인

### Phase 6: 마이그레이션 정리
1. 기존 스크립트/JSON 파이프라인 제거: `scripts/build-posts.ts`, `generated/*`
2. React Router 설정 제거: `react-router.config.ts`, `app/routes.ts`, `app/routes/*`
3. 불필요 의존성 제거 및 스크립트 업데이트

### Phase 7: 검증
1. 로컬 빌드/프리뷰
2. 라우트 접근 확인: `/`, `/posts`, `/posts/{slug}`, `/rss.xml`, `/404`
3. 첨부파일 경로 확인: `/posts/attachments/*`
4. 빌드 산출물 점검: 정적 파일 생성 여부
