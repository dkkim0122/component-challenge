# Animated Eyes Follow Mouse Cursor


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

<br/>

## 회전하는 애니메이션