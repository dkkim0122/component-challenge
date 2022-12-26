# Hover Effect Card

![hoverEffectCard](https://user-images.githubusercontent.com/108333110/209485911-3de84732-d08b-4136-9e29-f8a8e7547d44.gif)

<br/>

## 뒷배경색을 만들기

단순히 배경색이 변화하는 것뿐만 아니라, 아래에서부터 위로 배경색이 올라와야 한다. 이런 경우에는 아예 배경색만을 전담하는 요소를 따로 만들어 주는 것이 더 구현하기 편할 것 같다. 따라서 pseudo element를 통해 배경색을 구현하도록 한다.

```css
.hover-effect-card__card {
  position: relative;
	...
}

.hover-effect-card__card::before {
  content: "";
  position: absolute;
	bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: darkcyan;
}
```

::before를 사용하여 뒷배경을 만들었지만, 원래 요소의 text들이 이 친구한테 덮여져서 보이지 않는다. 

<img src="https://user-images.githubusercontent.com/108333110/209485956-c4699607-bd91-47f7-aa70-acf2fb4f19dc.png" width="200px" />

z-index를 사용하여 카드의 내용이 ::before보다 위에 나타날 수 있도록 한다. 이 때, z-index는 해당 요소의 **position이 static이 아닐 때만 적용**이 되므로([z-index가 동작하지않는 이유 4가지](https://erwinousy.medium.com/z-index%EA%B0%80-%EB%8F%99%EC%9E%91%ED%95%98%EC%A7%80%EC%95%8A%EB%8A%94-%EC%9D%B4%EC%9C%A0-4%EA%B0%80%EC%A7%80-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EA%B3%A0%EC%B9%98%EB%8A%94-%EB%B0%A9%EB%B2%95-d5097572b82f)), 일부러라도 position 값을 relative나 absolute로 만드는 작업이 필요하다.

```css
.hover-effect-card__card::before {
  ...
  z-index: 1;
}

.hover-effect-card__content {
  position: relative;
  z-index: 2;
}
```

<img src="https://user-images.githubusercontent.com/108333110/209485989-523f5ec0-44e9-4dff-9c11-47bf199d70ad.png" width="200px" />

보기에서는 ::before 요소가 밑에서부터 4px만 올라와 있기 때문에, 다음과 같이 처리한다.

```css
.hover-effect-card__card::before {
	...
  bottom: calc(-100% + 4px);
}
```

그리고 hover했을 때 content의 `color`가 하얀색으로 변하고, ::before의 위치가 맨 위로 올라오므로 `bottom`의 값을 변화시키도록 한다.

```css
.hover-effect-card__card:hover {
  color: white;
}

.hover-effect-card__card:hover::before {
  bottom: 0;
}
```

<img src="https://user-images.githubusercontent.com/108333110/209486042-10254d69-5856-490b-ad0b-a9a50c310290.gif" width="200px" />

이제 애니메이션을 넣어보도록 하자.

<br/>

## 애니메이션 넣기

card의 경우에는 `color`를, ::before의 경우에는 `bottom`을 변화시켜주어야 한다.

```css
.hover-effect-card__card {
	...
  transition: color 1s ease;
}

.hover-effect-card__card::before {
	...
  bottom: calc(-100% + 4px);
  transition: bottom 1s ease;
}
```

<img src="https://user-images.githubusercontent.com/108333110/209486049-44776ccc-49ac-4aba-9fd2-f6a979171d4c.gif" width="200px" />

<br/>

## 3개의 서로 다른 카드 만들기

애니메이션을 넣는 것까지는 어찌어찌 했지만, 내 생각에 여기서 가장 중요한 것은 똑같은 카드를 총 3개를 만들어야 한다는 것이다. 서로 스타일과 애니메이션은 동일하지만, title과 before의 `background-color`가 서로 다르다. 어떻게 하면 좀 편리하게 카드를 만들 수 있을까?

아래의 코드는 한 개의 카드만을 만들기 위한 로직이다. 

```jsx
import './HoverEffectCard.css'

export const createHoverEffectCard = () => {
  /* 전체 컨테이너를 만든다 */
  const container = document.createElement('article')
  container.classList.add('hover-effect-card__container')

	/* 카드 하나와 안의 내용물을 만든다 */
  const card = document.createElement('div')
  card.classList.add('hover-effect-card__card')

  const cardHeader = document.createElement('h2')
  cardHeader.innerText = 'First Card'
  cardHeader.classList.add('hover-effect-card__header')
  
  const cardContent = document.createElement('div')
  cardContent.classList.add('hover-effect-card__content')
  
  const cardText = document.createElement('p')
  cardText.innerText = 'Lorem ipsum...'
  cardText.classList.add('hover-effect-card__text')

  const cardButton = document.createElement('a')
  cardButton.innerText = 'Read More'
  cardButton.setAttribute('href', '#')
  cardButton.classList.add('hover-effect-card__button')
  
  /* 카드의 내용물을 카드에 담는다 */
  cardContent.appendChild(cardHeader)
  cardContent.appendChild(cardText)
  cardContent.appendChild(cardButton)
  card.appendChild(cardContent)

  /* 카드를 컨테이너에 담는다 */
  container.appendChild(card)

  return container
}
```

여러 카드를 만들 때 이 자바스크립트 파일에서는 각 카드에 들어가는 문구만 조정하도록 하고, 스타일은 CSS에서 관리하도록 하자.

자바스크립트 파일을 다음과 같이 작성하였다. 카드 하나를 만드는 로직을 `createCard`라는 함수 안에 두고 이 함수를 loop로 돌리는 방식이다. 총 3개 카드의 이름이 순서대로 First Card, Second Card, Third Card이므로 이 string들을 배열로 만들어 forEach로 순환하며 `createCard`를 호출한다.

```jsx
/* HoverEffectCard.js */

import './HoverEffectCard.css'

export const createHoverEffectCard = () => {
  const container = document.createElement('article')
  container.classList.add('hover-effect-card__container')

  const createCard = (sequence) => {
    const card = document.createElement('div')
    card.classList.add('hover-effect-card__card')

    const cardHeader = document.createElement('h2')
    cardHeader.innerText = `${sequence} Card`
    cardHeader.classList.add('hover-effect-card__header')
    
    const cardContent = document.createElement('div')
    cardContent.classList.add('hover-effect-card__content')
    
    const cardText = document.createElement('p')
    cardText.innerText = 'Lorem ipsum ...'
    cardText.classList.add('hover-effect-card__text')

    const cardButton = document.createElement('a')
    cardButton.innerText = 'Read More'
    cardButton.setAttribute('href', '#')
    cardButton.classList.add('hover-effect-card__button')
    
    cardContent.appendChild(cardHeader)
    cardContent.appendChild(cardText)
    cardContent.appendChild(cardButton)
    card.appendChild(cardContent)
    container.appendChild(card)
  }

  const sequenceOfCard = ['First', 'Second', 'Third']

  sequenceOfCard.forEach(sequence => {
    createCard(sequence)
  })

  return container
}
```

스타일은 CSS 파일에서 건드리기로 했으므로 `nth-of-type()`을 사용하여 첫째, 둘째, 셋째 카드 요소의 ::before의 배경색을 다음과 같이 정해준다.

```css
/* HoverEffectCard.css */

.hover-effect-card__card:nth-of-type(1)::before {
  background-color: darkcyan;
}

.hover-effect-card__card:nth-of-type(2)::before {
  background-color: orange;
}

.hover-effect-card__card:nth-of-type(3)::before {
  background-color: deeppink;
}
```