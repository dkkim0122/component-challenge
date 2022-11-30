# Clip Path Circle

![ezgif com-gif-maker (8)](https://user-images.githubusercontent.com/108333110/204682203-330116cd-9f55-46ca-ab6d-74d9c22abec5.gif)

## 개요

이 애니메이션은 크게 두 가지로 나눌 수 있을 것 같다.

1. 텍스트가 좌우로 무한히 움직인다.
2. 배경에 동그란 원이 있어, 이 원을 통과할 때 텍스트의 색이 바뀐다.

여기서 생각해보아야 할 것은 텍스트의 색을 부분적으로만 변화시키는 것은 쉽지 않은 일이라는 것이다. 좀 더 쉬운 길로 돌아가자. 두 개의 똑같지만 색만 다른 텍스트가 같은 속도로 움직인다고 가정해보자. 단지 원 안에서는 검정색 텍스트가, 원 밖에서는 하얀색 텍스트가 **보여지면** 되는 것이다. 그렇게 된다면 마치 원 안에 들어가면 텍스트의 색이 변화하는 것처럼 착각하게 할 수 있다.

<br/>

## 일단 두 개의 텍스트를 만들어보자

텍스트 두 개가 겹치듯 존재해야 한다. 따라서 검정색 container 요소 안에 두 개의 자식 요소를 만든다. 하나는 h2 요소로 하얀색 텍스트를 만들고, 다른 하나는 노란 원 요소로, 안에 검정색 h2 텍스트 요소를 가지고 있다.

```jsx
// ClipPathCircle.js

import './ClipPathCircle.css'

export const createClipPathCircle = () => {
  const text = 'Clip Path Circle'

  const article = document.createElement('article')
  article.classList.add('clip-path-circle__container')

  const articleText = document.createElement('h2')
  articleText.innerText = text
  articleText.classList.add('clip-path-circle__container-text')
  article.appendChild(articleText)

  const circle = document.createElement('div')
  circle.classList.add('clip-path-circle__circle')
  article.appendChild(circle)

  const circleText = document.createElement('h2')
  circleText.innerText = text
  circleText.classList.add('clip-path-circle__circle-text')
  circle.appendChild(circleText)

  return article
}
```

<br/>

<image width="500px" src="https://user-images.githubusercontent.com/108333110/204681169-0d5e50f1-a9e6-43bf-b0eb-f07260dee21a.png"></image>

<br/>

## 원을 만드는 방법

일단 원을 만들 수 있는 방법은 크게 두 가지가 있다. 첫째는 흔히 사용하는 `border-radius`를 50% 부여하는 방식이다. 둘째는 이번에 새로 배운, `clip-path` 속성을 이용하는 방식이다.

### border-radius

`border-radius`를 50%로 하면 원이 만들어진다. 이 때, 원은 작지만 그 안의 h2 텍스트 요소는 그보다는 훨씬 클 것이므로, 원 안에서만 해당 텍스트가 보여지게 해야 한다. 따라서 `overflow: hidden`으로 넘치는 텍스트는 보여주지 않는다.

```css
.clip-path-circle__circle {
  background-color: yellow;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

	/* 원 만들기 */
  width: 400px;
  height: 400px;
  border-radius: 50%;
	overflow: hidden;
}
```

<img width="500" alt="스크린샷 2022-11-30 오전 9 33 42" src="https://user-images.githubusercontent.com/108333110/204681366-a3987f27-9062-4312-ba98-e9e515298675.png">

`overflow: hidden`을 사용하지 않으면 다음과 같이 두 개의 텍스트가 겹치게 된다.

<br/>

### clip-path

clip-path 속성은 요소의 일부를 잘라내는 속성이다. inset, circle, polygon 등 여러 속성들이 있으며, 이 속성들에 맞추어 요소를 잘라 사용할 수 있다([간단한 Codepen 예시](https://codepen.io/dkkim0122/pen/BaVOjEy)).


```css
.box-inset {
  width: 100px;
  height: 100px;
  background-color: navy;
  clip-path: inset(0px 5px)
}

.box-circle {
  width: 100px;
  height: 100px;
  background-color: navy;
  clip-path: circle(50px at 0px)
}

.box-polygon {
  width: 100px;
  height: 100px;
  background-color: navy;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)
}
```

<img width="326" alt="스크린샷 2022-11-30 오전 9 51 07" src="https://user-images.githubusercontent.com/108333110/204681369-c4bdb2ed-3a5c-4183-a398-a9a4cd3cc744.png">

위에서부터 차례대로 inset, circle, polygon 속성을 부여한 예시이다.

우리는 원으로 만들어 줄 것이기 때문에 해당 요소에 `clip-path: circle` 속성을 부여해준다. 이 때 반지름은 `200px`로, 원의 중심은 요소의 중심, 즉 `50% 50%`으로 한다.

```jsx
.clip-path-circle__circle {
  background-color: yellow;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  clip-path: circle(200px at 50% 50%);
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100vh;
}
```

<img width="1146" alt="image" src="https://user-images.githubusercontent.com/108333110/204681642-ad8aef41-6624-4ae1-b98a-5a92e22513c2.png">

이 두 가지 속성 중 어느 것을 사용해도 다음과 같이 잘 나오는 것을 확인할 수 있다.

<br/>

## 애니메이션

이제 애니메이션을 사용해야 할 시점이다. 요소를 좌우로 움직여야 한다. 

일단 생각나는 것은 두 가지 방법이다. 첫째는 움직여야 하는 요소들을 `position: absolute`로 넣어 `left` 값과 `right` 값을 변경해주는 것이다. 하지만 이 방식은 사용하지 않을 것이다. 왜냐면 `transform` 속성 안의 `translate`를 적용시켜주면 똑같은 스타일을 구현해줄 수 있기 때문이다.

### transform: translate

`translate(X, Y)` 속성은 요소를 x좌표와 y좌표 상에서 주어진 거리만큼 움직이도록 해 주는 속성이다. 우리는 두 개의 텍스트 모두 적당한 거리(왼쪽 끝)에서 시작하여 오른쪽 끝까지 갔다가 다시 되돌아오기를 바라므로, `keyframes`에서 애니메이션의 시작과 끝에서 `-50%`의 x좌표를, 애니메이션의 중간에서 `50%` x좌표를 주도록 한다.

```jsx
@keyframes moveText {
  0%, 100% {
    transform: translate(-50%, 0)
  }

  50% {
    transform: translate(50%, 0)
  }
}
```

그리고 이 keyframes를 애니메이션에 적용하면 된다!

```jsx
{
  animation-name: moveText;
  animation-duration: 10s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}
```
