# Animated Eyes Follow Mouse Cursor

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/93521799/208302624-df3cf5c8-7b1d-483b-a591-513745b38519.gif)


## 개요

크게 세 가지를 중점으로 해야 할 것 같다.

- 눈알 만들기
- 마우스 커서의 위치를 알 수 있는 방법
- 마우스 커서의 위치를 눈알이 따라 굴러가는 애니메이션

일단 눈알부터 만들어 보자.

<br/>

## 스타일 적용

### box-shadow

요소의 주변에 그림자를 드리우는 속성이다. 눈알 주변으로 음영이 있기 때문에 해당 요소를 사용하여 이 스타일 처리를 해 줄 수 있을 거 같다. 

**inset 속성**

이 속성을 적용하지 않는다면 그림자가 요소의 바깥으로 만들어지고, 적용한다면 요소의 안쪽에서 그림자가 생긴다. 눈알은 음영이 요소 안쪽에 있으므로 `inset` 속성을 사용한다.

``` css
box-shadow: inset 0 0 30px;
```

`inset` 속성 뒤로, 첫 번째와 두 번째 인자는 *그림자의 x축과 y축 offset*을 의미한다. 눈알 그림자는 어느 한 쪽으로 치우쳐져 있는 것이 아니기 때문에 offset이 필요하지 않으므로 0의 값을 주었다. 

그리고 세 번째 인자는 blur-radius로, 그림자가 퍼지는 구간을 이야기한다. 당연히 이 수치가 커질수록 그림자는 멀리까지 도달하고, 작을수록 좁은 공간만 존재한다.



``` css
.animated-eyes__eye {
  width: 150px;
  height: 150px;
  background-color: white;
  border-radius: 50%;
  box-shadow: inset 0 0 30px;
  display: flex;
  align-items: center;
}
```

<br/>

### ::before

눈동자를 표현하기 위해 검정색 원 안에 하얀색 원을 넣어야 한다. 검정색인 바깥 원의 경우에는 눈알 `div`의 자식 요소로 append를 하여 주었지만, 또 검정색 원 밑에 자식 요소를 심어주는 것 말고 다른 방식도 있다. 

바로 **의사 요소를 사용하는 방법**이다. `::after`나 `::before`를 통해 가짜 HTML 요소를 만들어 줄 수 있고, 이를 통해서 하얀색 원을 만들 수 있다.

```css
.animated-eyes__eye-ball {
  margin: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: black;
  position: relative;
}

.animated-eyes__eye-ball::before {
  content: "";
  position: absolute;
  top: 25%;
  left: 25%;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: white;
}
```

중요한 점은 의사 요소의 주인(?) 요소에게 `position: relative` 속성을 부여하여 의사 요소의 위치를 조절해야 한다는 것, 그리고 의사 요소의 자체 속성 중 `content` 속성은 무조건 존재하기는 해야 한다는 것이다(비어 있어도 된다. 없으면 아예 의사 요소가 나타나지를 않는다!).

아무튼 해당 작업을 통해서 다음과 같이 눈을 만들 수 있다.

<img width="450" alt="image" src="https://user-images.githubusercontent.com/93521799/205493182-712ef274-c983-40d7-84a4-7c236cd3ef80.png"></img>


<br/>

## 마우스 커서의 위치를 어떻게 알 수 있을까?
[onmousemove CodePen 예제](https://codepen.io/dkkim0122/pen/gOKqROJ)

위의 예제에서도 알 수 있듯이, 원하는 HTML 요소에 onmousemove 이벤트 핸들러를 부착시키면 된다.

## 마우스 커서에 맞추어 눈알을 회전시키기

마우스 커서의 위치를 알았다. 남은 것은 눈알을 회전시키는 것. 어떤 요소를 회전시키기 위해 사용하는 CSS 속성이 있다. 바로, `transform`의 `rotate`이다.

<br>

### 요소 회전하기 - transform: rotate

<br>

### 요소의 위치 찾기 - getBoundingClientRect()과 clientWidth

각 눈의 중앙에서부터 마우스 커서까지의 좌표를 구해야 하는 것이므로, 커서의 x 좌표와 y 좌표를 각각 `cursorX`와 `cursorY`라 했을 때, 다음과 같이 계산식을 만들 수 있을 것 같다.

```jsx
const [leftEye, rightEye] = article.querySelectorAll('.animated-eyes__eye')

const calculateEyeRotateDegree = (cursorX, cursorY) => {
	/* 눈의 중앙 */
  const leftEyeX = leftEye.getBoundingClientRect().left + leftEye.clientWidth / 2
  const leftEyeY = leftEye.getBoundingClientRect().top + leftEye.clientHeight / 2
  const rightEyeX = rightEye.getBoundingClientRect().left + rightEye.clientWidth / 2
  const rightEyeY = rightEye.getBoundingClientRect().top + rightEye.clientHeight / 2
	
	/* 눈이 회전하는 각도 */
  const leftEyeDegree = Math.atan2(cursorX - leftEyeX, leftEyeY - cursorY) - Math.PI * 1.5
  const rightEyeDegree = Math.atan2(cursorX - rightEyeX, rightEyeY - cursorY) - Math.PI * 1.5

	/* 회전하는 애니메이션 */
  leftEye.style.transform = `rotate(${leftEyeDegree}rad)`
  rightEye.style.transform = `rotate(${rightEyeDegree}rad)`
}
```

<br>

### 이벤트 핸들러 부착

위의 계산이 마우스가 움직일 때마다 수행되어야 한다. 따라서 해당 계산을 container 요소의 mousemove 이벤트 핸들러에 포함시키도록 한다.

```jsx
article.addEventListener('mousemove', (e) => {
  const x = e.clientX
  const y = e.clientY
  calculateEyeRotateDegree(x, y)
})
```

<br>

### 개선 : 쓰로틀링 적용

이 때 mouse move 이벤트가 발생할 때마다 핸들러를 호출하는 것은 좀 비효율적일 수 있다. 계산의 양이 적은 것도 아닌데도 불구하고 마우스의 매 움직임마다 되풀이되는 것이기 때문이다. 따라서 이벤트 핸들러에 쓰로틀링을 걸어주도록 한다. 

쓰로틀링을 사용하면 연속되는 이벤트 핸들러 호출을 지정된 시간 간격마다의 호출로 최적화 시켜줄 수 있다. 

```jsx
let throttleCheck

const throttle = (callback, milliseconds) => {
  return function() {
    if(!throttleCheck) {
      throttleCheck = setTimeout(() => { // 리턴값은 timeoutID => true로 인식
        callback(...arguments)
        throttleCheck = false
      }, milliseconds)
    }
  }
}

article.addEventListener(
  'mousemove', 
  throttle(e => calculateEyeRotateDegree(e.clientX, e.clientY), 50)
)
```

위의 코드가 쓰로틀링을 구현하여 사용한 코드이다.

`throttleCheck`라는 boolean 변수가 있고, 이 변수가 truthy할 때만 콜백 함수가 호출이 되는 구조이다.

`throttle` 함수는 콜백 함수와 시간 간격을 인자로 받는다. 시간 간격을 받아 `setTimeout()` 메서드가 실행이 되고, 그 안에 있는 콜백 함수가 호출된다. `setTimeout`은 리턴 값으로 `timeoutID`라는 정수값을 반환해준다. 따라서 `setTimeout`이 실행되어 대기하고 있는 `milliseconds` 동안에는 `throttleCheck`가 true이기 때문에 다시 `setTimeout`이 실행되지 않고, `milliseconds`가 지나 `setTimeout` 내부의 로직이 수행(콜백 함수도 이 때 호출)되면서 false로 바뀌면서 다시 `setTimeout`이 실행된다.

콜백 함수는 다음과 같다.

```jsx
(e) => calculateEyeRotateDegree(e.clientX, e.clientY)
```

`arguments`로 이벤트 객체 `e`를 받게 되어 그 안의 `calculateEyeRotateDegree()`라는, 실제로 눈알을 굴리는 역할을 하는 함수가 실행되게 된다.

<br/>

## 참고자료
[Element.getBoundingClientRect() - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/Element/getBoundingClientRect)

[Element.clientWidth - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth)

[Throttle과 Debounce의 구현 및 예제](https://pewww.tistory.com/9)

[Debounce 와 Throttle 리액트로 구현하기](https://velog.io/@skawnkk/debounce-throttle)

[ZeroCho Blog](https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa)