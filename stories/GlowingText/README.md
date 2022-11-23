# Glowing Text
![ezgif com-gif-maker (6) 복사본 3](https://user-images.githubusercontent.com/108333110/203452985-e69bcf88-efe8-4740-be57-44557ff918a8.gif)


## color

불이 들어왔다가 사라지는, 즉 텍스트가 밝아졌다 다시 어두워지는 애니메이션을 구현하기 위해서는 어떻게 해야 할까. 

먼저 생각나는 방법은 `keyframes`를 사용하는 것. 원래의 텍스트 색을 검정색으로 해 놓고, `keyframes`를 통해 시작을 흰색으로 해 놓으면 **흰색 → 검정색**으로 색이 변화하면서 반짝인다.

```css
.glowing-text__container span {
  **color: #111111;**
  font-size: 192px;
  font-weight: 700;
	animation-duration: 2s;
  animation-name: glowing;
  animation-iteration-count: infinite;
	animation-timing-function: ease;
}

@keyframes glowing {
  0% {
    **color: white;**
  }
}
```

총 2sec동안 애니메이션이 실행되고, 이 때 애니메이션은 `glowing`을 사용한다. 무한히 이 애니메이션이 반복되었으면 하기 때문에 `animation-iteration-count`는 `infinite`로 한다. 

![ezgif com-gif-maker (6)](https://user-images.githubusercontent.com/108333110/203452872-804d7c52-d652-4b56-9515-2d0739747d4d.gif)

완벽하지는 않지만 색이 반짝이고는 있다. 지금 흰색 → 검정색으로 되어 있는 부분을 조금 수정해보도록 한다. 

각각의 텍스트들은 검정색으로 있는 시간이 흰색으로 있는 시간보다 더 길다. 지금은 기본 색상이 검정색으로 되어 있고 애니메이션이 시작되면 확 하얀색으로 바뀐다. 만약 애니메이션 중간의 대부분을 검정색으로 유지하고 시작과 끝을 흰색으로 하면 하얀색이 깜빡이는 듯 구현할 수 있을 것이다.

```css
@keyframes glowing {
  0% {
    color: white;
  }

  5% {
    color: #111111;
  }

  95% {
    color: #111111;
  }

  100% {
    color: white;
  }
}
```

![ezgif com-gif-maker (6) 복사본](https://user-images.githubusercontent.com/108333110/203452946-40267e45-c11d-44f9-9fbb-a9b59a74f650.gif)

## 특수효과(?)

원본 애니메이션은 반짝일 때 **주변까지 흐릿해진다**. 이를 구현하기 위해서는 `filter` 속성의 `blur(radius)`와 `text-shadow`의 조합을 사용하면 된다. 

### **filter: blur()**

이 친구를 사용하여 해당 요소에 흐릿한 효과를 줄 수 있고, 이 친구가 ‘주변까지 흐릿해진다’의 ‘흐릿해진다’를 담당하는 친구이다.

```css
filter: blur(1px)
```

인자로는 얼마나 흐릿하게 표현할지 blur의 radius를 전달해준다. 당연히 이 값이 커질수록 흐릿한 정도 역시 비례한다.

### **text-shadow**

이 친구를 사용하여 글자에 그림자를 줄 수 있고, 이 친구가 ‘주변까지 흐릿해진다’의 ‘주변’을 담당하는 친구이다. 

```css
text-shadow: offset-x offset-y blur-radius color | none | initial | inherit
```

여기서 offset-x와 offset-y는 필수값이고, blur-radius는 디폴트로 0을, color는 디폴트로 브라우저 기본값을 가진다.

**적용**

위의 두 속성을 색이 흰색일 때 적용시키고, 검정색일 때는 적용하지 않도록 만들어준다.

```css
@keyframes glowing {
  0%, 100% {
    color: white;
    filter: blur(1px);
    text-shadow: 0 0 10px cyan;
  }

  5%, 95% {
    color: #111111;
    filter: blur(0);
    text-shadow: none;
  }
}
```

![ezgif com-gif-maker (6) 복사본 2](https://user-images.githubusercontent.com/108333110/203452974-446f0029-e7c2-4bb5-8ae7-69d8973d6e7d.gif)

### animation-delay

이제 이 친구들이 각각 일정한 간격을 두고 애니메이션이 실행될 수 있게 만들어야 한다. 그래야 파도타기처럼 글자들이 순서대로 깜박일 테니까.

요소들을 순서에 맞게 다른 delay를 먹여야 하는데, 여러 방법이 있을 수 있겠지만 일단 only css로 구현해본다면 다음과 같을 것이다.

```css
.glowing-text__container span:nth-of-type(1) { animation-delay: 0.25s; }
.glowing-text__container span:nth-of-type(2) { animation-delay: 0.5s; }
.glowing-text__container span:nth-of-type(3) { animation-delay: 0.75s; }
.glowing-text__container span:nth-of-type(4) { animation-delay: 1s; }
.glowing-text__container span:nth-of-type(5) { animation-delay: 1.25s; }
.glowing-text__container span:nth-of-type(6) { animation-delay: 1.5s; }
.glowing-text__container span:nth-of-type(7) { animation-delay: 1.75s; }
```

일일이 해당 요소들에게 속성을 매기는 것이다. 이는 단순한 방식이지만, 글자 수가 7개라는 것을 알고 있어야지만 사용할 수 있는 방법이다. 그리고 하드코딩으로 작성한 것 같은 마음이 들어 편하지는 않다.

만약 자바스크립트를 사용하면 어떻게 될까? 글자 수가 변화한다 해도 우리는 이를 신경쓸 필요가 없을 것이다.

```jsx
// GlowingText.stories.js

const article = document.createElement('article')
article.classList.add('glowing-text__container')

const name = 'DOKYUNG'

for(let i = 0; i < name.length; i++) {
  const span = document.createElement('span')
  span.innerText = name[i]
  **span.style.animationDelay = `${i * 0.25}s`**
  article.appendChild(span)
}
```