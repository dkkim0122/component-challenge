# Accordion

![ezgif com-gif-maker (5) 복사본](https://user-images.githubusercontent.com/93521799/211559113-c4cf7900-c374-4a47-a31e-63844bf3c553.gif)

아코디언 메뉴 헤더를 클릭하면 밑에 콘텐츠가 나타나야 한다. 그리고 헤더를 한 번 더 클릭하면 콘텐츠가 사라진다. 

<br />

헤더를 클릭하면 두 가지의 변화가 있다.

- 헤더의 오른쪽 ‘+’ 아이콘이 ‘-’로 변한다.
- 콘텐츠가 헤더의 바로 밑에 나타난다.

이 두 가지 변화를 모두 나타내기 위해서 클릭 시 헤더와 콘텐츠에게 클래스를 입히도록 한다.

```jsx
const handleClickHeader = (header, content) => {
  if (header.classList.contains('accordion__header--open')) {
    header.classList.remove('accordion__header--open')
    content.classList.remove('accordion__content--open')
    return
  }

  header.classList.add('accordion__header--open')
  content.classList.add('accordion__content--open')
}

accordionHeader.addEventListener('click', () => handleClickHeader(accordionHeader, accordionContent))
```
<br />

HTML 요소에 특정 클래스가 있는지 여부를 판단할 수 있는 방식은 `HTMLElement.classList.contains(’클래스명’)`을 사용하는 것이다. 만약 `--open`이라는 클래스가 헤더에 있다면 헤더와 컨텐츠에서 해당 클래스를 지워주고, 없다면 추가해준다.

이 코드를 `classList.toggle(’클래스명’)`을 사용하면 좀 더 간단하게 짤 수 있다. 

```jsx
const handleClickHeader = (header, content) => {
  header.classList.toggle('accordion__header--open')
  content.classList.toggle('accordion__content--open')
}
```

아코디언의 콘텐츠는 클릭하기 전에는 보이지 않다가 클릭하면 나타나야 한다. 따라서 CSS를 `display: none`으로 설정해서 사용할 수 있다.

```css
.accordion__content {
  background-color: white;
  height: 100px;
  overflow-y: scroll;
  padding: 8px 16px;
  display: none;
}

.accordion__content--open {
  display: block;
}
```
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/93521799/211559397-5cc3d203-7e75-408d-bc4f-ccfcce22683a.gif)


이제 클릭을 하면 컨텐츠가 생기는 것을 볼 수 있다. 

<br />

그러나 한 가지 아쉬운 점은, 컨텐츠가 나타날 때 다음과 같이 헤더가 위로 밀린다는 점이다. 헤더의 위치는 고정이고, 그 밑으로 컨텐츠가 나타났으면 좋겠다. 이 말은 **컨텐츠가 차지하는 공간이 헤더에 영향을 주지 않아야 한다**는 말이다. 따라서 컨텐츠의 position을 absolute로 가져가는 방식을 생각해 볼 수 있겠다.

```css
.accordion__header {
	...
  position: relative;
}

.accordion__content {
  ...
  position: absolute;
}
```


이제 애니메이션을 넣을 차례이다.

<br />
<br />

## 애니메이션 넣기

애니메이션은 컨텐츠가 밑으로 내려가면서 나타나는 모습이다. 이 애니메이션을 어떻게 구현할 수 있을까…

<br />

## 시도 1

`.content`에 height 0을 주고 `.content--open`에 100px을 준다. 그리고 `.content`에 transition을 매긴다.

```css
.accordion__content {
  height: 0px;
  transition: height 1s ease;
}

.accordion__content--open {
  height: 100px;
}
```

당연히 되지 않는다. transition은 그 속성이 매겨진 요소의 특정 속성이 달라질 때에만 적용이 된다. height가 100px인 것은 `.content`가 아닌 `.content—-open`이므로 성립하지 않는다.

<br />

## 시도 2

시도 1이 서로 다른 클래스의 속성에 대해 transition을 부여하느라 실패했으므로 이번에는 같은 클래스의 속성을 변화시킬 수 있는 방법을 찾아보도록 한다. animation을 사용하여 `.content--open`의 height를 0에서 100px로 변화시킨다.

```css
.accordion__content {
  background-color: white;
  overflow-y: scroll;
  padding: 8px 16px;
  display: none;
  position: absolute;
}

.accordion__content--open {
  display: block;
  animation: appear 0.2s linear;
}

@keyframes appear {
  0% {
    height: 0px;
  }

  100% {
    height: 100px;
  }
}
```

이렇게 하면 클릭해서 컨텐츠가 나타날 때 애니메이션을 구현할 수 있다! 

문제는 컨텐츠가 사라질 때 어떤 방식으로 사라지게 만드느냐는 것이다. 지금은 컨텐츠가 나타날 때에 대한 것만 코딩이 되어 있지 사라지는 것에 대해서는 없기 때문이다.

<br />

## 시도 3

컨텐츠가 열렸을 때의 클래스와 닫혔을 때의 클래스를 다르게 설정해서 각각에게 애니메이션을 부여한다.

```jsx
const accordionContent = document.createElement('main')
accordionContent.classList.add('accordion__content')
accordionContent.classList.add('accordion__content--close') // 닫혀있을 때

const handleClickHeader = (header, content) => {
  header.classList.toggle('accordion__header--open')
  content.classList.toggle('accordion__content--open')
  content.classList.toggle('accordion__content--close')
}
```

```css
.accordion__content--open {
  display: block;
  height: 100px;
  animation: appear 0.2s linear;
}

.accordion__content--close {
	display: none;
  height: 0px;
  animation: disappear 0.2s linear;
}

@keyframes appear {
  0% {
    height: 0;
  }

  100% {
    height: 100px;
  }
}

@keyframes disappear {
  0% {
    height: 100px;
  }

  100% {
    height: 0;
  }
}
```

그런데 이렇게 해도 `—-close` 클래스가 붙여질 때 애니메이션이 적용되지 않는다…

<br />

## animation 및 transition이 적용되지 않았던 이유

바로 `display: none`을 사용하였기 때문이다([참조](https://stackoverflow.com/questions/13037637/css-animation-and-display-none)). display를 CSS에서 지운 후에 open과 close의 모양을 height로 결정하는 것이 좋을 것 같다. 

사실 animation을 사용하는 것도 좋지만, 아주 간단한 요소의 변경 같은 경우에는 transition을 사용하는 것이 코드를 번잡스럽게 하지 않을 것 같다. 

```css
.accordion__content {
  ...
  transition: all 0.5s;
}

.accordion__content--open {
  height: 100px;  
}

.accordion__content--close {
  height: 0px;
}
```

애니메이션이 잘 작동하는 것을 확인할 수 있다!!! 

![ezgif com-gif-maker (1) 복사본](https://user-images.githubusercontent.com/93521799/211551597-c6768888-d57c-4b30-8a5c-e00fc2b13b45.gif)

<br />

## 스타일 정리

다만 다음과 같이 close되었을 때 공간이 남아 있는 문제가 있는데, 이는 컨텐츠를 만들 때 padding을 주었던 것이 close를 하면서까지 남아 있어서 그렇다.

<img width="571" alt="image" src="https://user-images.githubusercontent.com/93521799/211549565-01593e93-745b-4332-b6f1-259029274daa.png">


다음과 같이 padding을 없애 주고, transition의 대상을 all이 아닌 height에만 주었는데, 이는 padding의 변화는 애니메이션으로 보고 싶지 않았기 때문이었다.

```css
.accordion__content {
  ...
  transition: height 0.5s;
}

.accordion__content--open {
  height: 100px;  
}

.accordion__content--close {
  height: 0px;
  padding: 0;
}
```

![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/93521799/211553906-8d6e7166-4f61-411f-a458-7e2e3a60922d.gif)

이렇게 하여도 아코디언이 닫히는 순간에 padding이 변하면서 콘텐츠 내용물이 움직인다. 굉장히 신경쓰이는 부분이라, 이를 해결하기 위해 그냥 content를 감싸는 새로운 wrapper를 넣어 height을 이 친구에게 먹이고, content에 padding을 주기로 한다.

```css
.accordion__content-wrapper {
  padding: 0px;
  background-color: white;
  overflow-y: scroll;
  transition: height 0.5s;
}

.accordion__content {
  padding: 8px 16px;
}

.accordion__content-wrapper--open {
  height: 100px;  
}

.accordion__content-wrapper--close {
  height: 0px;
  padding: 0;
}
```

![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/93521799/211556242-38e3db9a-ae0a-4527-aaaa-d7c2b412596e.gif)

이제서야 제대로 된 애니메이션이 나오는 것을 볼 수 있다.

<br />

## 복수의 아코디언 생성

예시에는 3개의 아코디언 메뉴가 있었으므로, 3개를 똑같이 만들어 주어야 한다. 하나의 아코디언 메뉴를 만드는 모든 로직을 `createAccordionElement`라는 함수로 만들어 주고, 이를 순서 배열에 forEach문을 돌려서 3개의 아코디언 메뉴를 만들어준다.

```jsx
const sequenceArray = ['First', 'Second', 'Third']
sequenceArray.forEach(sequence => createAccordionElement(sequence))
```

![ezgif com-gif-maker (5) 복사본](https://user-images.githubusercontent.com/93521799/211559113-c4cf7900-c374-4a47-a31e-63844bf3c553.gif)