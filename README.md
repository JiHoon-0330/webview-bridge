## 폴더 구성

- web 폴더에 vite로 생성된 react 프로젝트가 존재합니다.
- app 폴더에 expo로 생성된 react-native 프로젝트가 존재합니다.

## 실행

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

## 테스트 환경

앱과 브라우저 두 가지 플랫폼에서 기존에 발생하던 상황을 재현했습니다.

### 오류 상황 테스트

- 앱에서 테스트 `/` 기본 경로로 접속하면 앱에서의 상황을 테스트 할 수 있습니다. 웹뷰에선 `/` 기본 경로를 사용해 주세요.
- 브라우저에서 테스트: `/web` 경로로 접속하면 브라우저에서 상황을 테스트 할 수 있습니다.

### 수정된 상황 테스트

- `/set-web` 경로로 접속하면 브라우저에서 수정된 상황을 테스트 할 수 있습니다.
- `/cache-web` 경로로 접속하면 브라우저에서 수정된 상황을 테스트 할 수 있습니다.

## 발생한 오류

getInAppToken 함수가 동시에 여러번 호출되는 경우 마지막으로 호출된 결과만 리턴되는 문제가 발생함

```typescript
class Token {
  async getToken() {
    const token = await this.getInAppToken();
    return token;
  }

  async getInAppToken() {
    return new Promise<string | null>((resolve) => {
      window.getInAppToken = (token) => {
        resolve(token);
      };

      setTimeout(() => {
        window.getInAppToken("token");
      }, 0);
    });
  }
}
```

getInAppToken 함수가 동시에 여러번 호출되는 경우 window.getInAppToken 전역 변수에 새로운 함수가 덮어 쓰인다. 새로운 함수가 덮어 쓰이면서 발생하는 문제는 resolve의 값이 새로 할당되는 것이다. window.getInAppToken 함수가 호출되는 시점에 resolve 값은 마지막으로 할당된 프로미스의 값이기 때문에, 마지막으로 호출된 함수로만 resolve 값이 전달되고, 이전에 호출된 함수들은 resolve 값을 받을 수 없는 상황이 발생했던 것

## 수정한 내용

resolve 가 덮어 쓰이지 않도록 캐시하거나, 모든 resolve 가 호출될 수 있도록 한다.

### (1) 모든 resolve를 호출하는 방법

resolve가 덮어쓰이지 않도록 Set에 저장한 다음 실행하도록 변경

```typescript
class Token {
  private listener: Set<(token: string) => void> = new Set();

  async getToken() {
    const token = await this.getInAppToken();
    return token;
  }

  async getInAppToken() {
    return new Promise<string | null>((resolve) => {
      this.listener.add(resolve);

      window.getInAppToken = (token) => {
        this.listener.forEach((fn) => {
          fn(token);
          this.listener.delete(fn);
        });
      };

      setTimeout(() => {
        window.getInAppToken("token");
      }, 0);
    });
  }
}
```

### (2) resolve 가 덮어 쓰이지 않도록 캐시하는 방법

tokenCache 에 Promise 값을 저장해 덮어 쓰이지 않도록 한다.

```typescript
class Token {
  private tokenCache: Promise<string | null> | null = null;

  async getToken() {
    this.tokenCache ??= this.getInAppToken();
    const token = await this.tokenCache;
    this.tokenCache = null;

    return token;
  }

  async getInAppToken() {
    return new Promise<string | null>((resolve) => {
      window.getInAppToken = (token) => {
        resolve(token);
      };

      setTimeout(() => {
        window.getInAppToken("token");
      }, 0);
    });
  }
}
```
