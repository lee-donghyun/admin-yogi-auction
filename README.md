# Yogi-Auction 어드민  
[요기옥션 어드민](https://admin.yogi-auction.shop) 프로젝트입니다. 테스트 계정 (id: super, pw: yogiauction)

## 개요
create-react-app과 ant design, firebase를 사용해 구현한 요기옥션 어드민입니다. 요기옥션에서 거래되고 있는 모든 상품을 관리합니다. 사용자의 상품 등록 요청을 검수합니다.  

기능은 계속 업데이트 예정입니다.  

요기옥션 웹은 다른 레포지토리를 참고해주세요. ([yogi-auction](https://github.com/lee-donghyun/yogi-auction))


## 기술 스택
- typescript : 규모가 커지더라도 부담이 없다. 컴파일 과정에서 에러를 내서, 예상치 못한 버그를 최대한 줄일 수 있다. 컴포넌트 props 자동완성으로, 개발 효율성을 올려준다.
- firebase : 백엔드 개발없이 사용자 인증, 서버등을 구현 할 수 있다.
- ant-design : 잘 만들어지고, 잘 관리되는 디자인 시스템이다. 잘 만들어진 리액트 프레임워크로, 여러명이서 협업을 하고 유지보수성이 좋다. 독자적 디자인이 중요하지 않고, 이미 구현된 컴포넌트를 적당히 사용한다면 빠른 개발이 가능하다. 
- recoil : atom과 selector, 내장 훅의 조합으로 간단하게 전역 상태를 관리 할 수 있다. 비동기 처리도 기본기능으로 구현이 가능하다.
- swr : 데이터 페칭을 간단하고 직관적으로 구현 할 수 있다. stale while revalidate라는 이름에 걸맞게 데이터를 유지하며 최신 데이터를 보장받을 수 있다. 
- react-router v6 : 기존 익숙하던 방식과는 달랐지만, nested routing이 직관적이라고 느껴졌다.

## 배포
[https://admin-yogi-auction.shop](https://admin.yogi-auction.shop)
vercel을 사용합니다. main 브랜치에 push하면 배포 됩니다.

## 로컬 서버
```
npm i && npm run start
```
