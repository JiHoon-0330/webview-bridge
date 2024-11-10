현재 프로젝트 구성과 실행 방법

- web 폴더에 vite로 생성된 react 프로젝트가 존재합니다.
- app 폴더에 expo로 생성된 react-native 프로젝트가 존재합니다.

web 실행: web 폴더에서 npm run dev 를 실행해 주세요.

실행 후 출력되는 Network 주소를 app/.env 파일을 생성후 아래와 같은 형식으로 입력해 주세요.

예시)

```
  VITE v5.4.10  ready in 143 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://0.0.0.0:3000/
  ➜  press h + enter to show help
```

```
app/.env 파일
EXPO_PUBLIC_URL = http://0.0.0.0:3000/
```

app/.env 파일 생성 후 app 폴더에서 npx expo start 를 실행해 주세요.

---

기존에 발생하던 상황을 재현했습니다.

web/src/App.tsx 파일에서 나중에 불러온 데이터만 화면에 표시됩니다.
