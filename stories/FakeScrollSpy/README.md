# Fake Scrollspy

![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/93521799/212330294-c7fc1fca-dd7f-47a0-ae26-eb9fb20152fa.gif)

메인 페이지가 여러 섹션으로 나누어져 있고, 각각의 섹션에 진입했을 때 네비게이션 바의 해당 섹션의 스타일이 변경되어야 한다. 

</br>

## HTML 구조 만들기

``` javascript
const container = document.createElement('article')
  container.id = 'article'

  const contents = `
    <section id="home" class="section-area"><span>Home Section</span></section>
    <section id="about" class="section-area"><span>About Section</span></section>
    <section id="services" class="section-area"><span>Services Section</span></section>
    <section id="portfolio" class="section-area"><span>Portfolio Section</span></section>
    <section id="contact" class="section-area"><span>Contact Section</span></section>
    <nav>
      <a href="#home" class="nav-menu"><span>Home</span></a>
      <a href="#about" class="nav-menu"><span>About</span></a>
      <a href="#services" class="nav-menu"><span>Services</span></a>
      <a href="#portfolio" class="nav-menu"><span>Portfolio</span></a>
      <a href="#contact" class="nav-menu"><span>Contact</span></a>
    </nav>
  `
  container.innerHTML = contents

```


일단 다음과 같이 HTML 구조를 작성하였다. 각 네비게이션 버튼의 href를 해당하는 섹션의 id로 만들었다. 이렇게 하면 해당 버튼을 클릭했을 떄 자신이 가리키고 있는 섹션으로 이동하게 된다([MDN 문서 참조](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#linking_to_an_element_on_the_same_page))! 클래스 이름으로 href에 링크를 등록했더니 되지는 않는다. 아마 ID는 HTML 문서 전체에서 고유한 값을 가지는 속성이지만 클래스는 여러 요소가 같은 클래스 이름을 가질 수 있어 특정하기 어렵기 때문이 아닌가 한다([관련 스택오버플로우 질문글](https://stackoverflow.com/questions/69993266/how-to-link-class-name-in-href-of-same-html-file)).

전체적인 구조를 살펴보면, 섹션들이 `article`이라는 컨테이너 요소 안에 들어 있고, 그 밑에 네비게이션 바가 있다. 기본적으로는 이렇게 작성하기보다는, 아예 `nav`와 `section`을 나눠서 다음과 같이 작성하는 것이 흔할 것이다.

``` html
<article>
  <nav>
    <a href="#home" class="nav-menu"><span>Home</span></a>
    <a href="#about" class="nav-menu"><span>About</span></a>
    <a href="#services" class="nav-menu"><span>Services</span></a>
    <a href="#portfolio" class="nav-menu"><span>Portfolio</span></a>
    <a href="#contact" class="nav-menu"><span>Contact</span></a>
  </nav>
  <main>
    <section id="home" class="section-area"><span>Home Section</span></section>
    <section id="about" class="section-area"><span>About Section</span></section>
    <section id="services" class="section-area"><span>Services Section</span></section>
    <section id="portfolio" class="section-area"><span>Portfolio Section</span></section>
    <section id="contact" class="section-area"><span>Contact Section</span></section>
  </main>
</article>  

```

나도 처음에는 이렇게 작성하였지만 만약 추후에 설명할 방식으로 Scrollspy를 구현하고자 한다면 첫 번째 방법을 사용해야 제대로 동작한다. 그 이유에 대해서는 차차 설명하도록 하겠다.

</br>

## 스타일링
각 섹션들에게 충분한 너비와 높이를 주고, 홀수번째 섹션 배경색은 검정색으로, 짝수번째 섹션 배경색은 회색으로 만든다.

``` css
.section-area {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 60px;

}

.section-area:nth-of-type(odd) {
  background-color: black;
}

.section-area:nth-of-type(even) {
  background-color: gray;
}

```
</br>

### 헤더 고정하기
스크롤을 내릴 때 헤더는 늘 위에 고정되어야 한다. 따라서 헤더에 `position: fixed`를 적용한다.

``` css
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  ...
}
```


![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/93521799/212309238-2e17fb11-2e17-4dd9-aa05-a2004936737e.gif)

</br>

### 스무스한 화면 이동 구현

지금은 네비게이션 바를 클릭하면 바로 해당 섹션으로 딱딱하게 이동된다. 하지만 해당 섹션으로 이동할 때 스크롤되면서 부드럽게 이동한다면 좀 더 예쁘지 않을까 한다.

```css
* {
  scroll-behavior: smooth;
}

```

![](https://velog.velcdn.com/images/dkkim0122/post/caed7b1e-9875-4571-ab30-5e7f031b9330/image.gif)

</br>
</br>

## Scrollspy 구현하기
이제 하이라이트인 scrollspy를 구현하여 보자.

가장 이상적인 방법은 내가 보고 있는 화면(뷰포트)에 들어온 섹션을 확인하는 것이겠지만, 그것보다는 더 간단한 방식으로 구현할 수 있는 방법이 있다. 

바로 마우스의 hover를 이용하는 것인데, 마우스가 어디 섹션에 놓여져 있는지를 파악하여 그 섹션에 해당하는 네비게이션 바 스타일을 바꾸는 것. 이것을 자바스크립트를 사용하지 않고 순수 CSS만을 이용하여 구현해보려 한다.

각 섹션에 고유 ID를 부여하였으므로, 이를 가지고 내가 hover하고 있는 요소가 어딘지를 특정할 수 있을 것이다.

</br>

### CSS 대괄호 선택자([], square bracket)
**href 링크로 ID `home`을 가지고 있는 anchor(`<a>`) 요소**를 CSS에서 특정하고 싶다. 이 때 사용할 수 있는 방법이 바로 대괄호 선택자이다.

``` CSS
nav a[href="#home"] {
	color: red:
}

```

<img width="975" alt="스크린샷 2023-01-13 오후 9 31 54" src="https://user-images.githubusercontent.com/93521799/212321151-8b2f1d9a-06f0-4c4c-a26b-3d4dd1a4b771.png">


CSS의 대괄호 선택자는 해당 속성을 가지고 있는 특정한 HTML 요소를 찾아 그 요소에 스타일을 부여해 준다. 나는 `nav` 요소의 하위에 있는 `anchor` 요소 중, `href` 속성의 값으로 `#home`을 가지고 있는 요소를 찾아 글자 색을 붉은색으로 변경해 준 것이다.

실제로 해당 조건을 만족하는 `nav` 하위 `anchor` 태그는 네비게이션 바 중 맨 왼쪽에 있는 "Home"이므로, 그 친구가 결과적으로 빨간색으로 스타일을 적용받게 된다.

``` html
<nav>
    <a href="#home" class="nav-menu"><span>Home</span></a>
    ...
</nav>

```

</br>

### CSS 물결 무늬 선택자(~, tilde)
우리는 CSS의 tilde 선택자를 이용하여 

물결 무늬의 선택자의 진짜 이름은 **Subsequent-sibling Combinator**이다. 

> The elements represented by the two sequences share the same parent in the document tree and the element represented by the first sequence **precedes** (not necessarily immediately) the element represented by the second one.

[출처](https://www.w3.org/TR/selectors-3/#general-sibling-combinators)

만약 다음과 같은 코드가 있을 때, h1의 뒤에 따라오는, 같은 레벨의 pre 요소에 대한 스타일 지정을 해 줄 수 있다.

``` css

h1 ~ pre {
	color: red;
}

```

``` html
<pre>h1 앞의 pre니까 적용 X</pre>
<h1>나를 기준으로 나보다 뒤에 오는 pre</h1>
<p>나는 pre가 아니니 적용 X</p>
<pre>h1 뒤의 pre니까 적용 O</pre>
<div>
  <pre>h1 뒤지만 같은 레벨이 아니라서 적용 X</pre>
</div>

```

<img width="553" alt="스크린샷 2023-01-13 오후 10 02 35" src="https://user-images.githubusercontent.com/93521799/212326308-b402e92b-1457-465d-a8ab-98b9e80bf374.png">

자, 이 Subsequent-sibling Combinator를 이용하여 어떻게 Scrollspy를 구현할 수 있을까? 우리가 하려는 것은 다음과 같다. 

> 우리가 마우스를 hover한 section의 ID를 href로 갖는 anchor 태그를 찾을 것이다. section의 뒤에 존재하는 nav 요소 안의 해당 anchor 태그를 tilde 선택자를 이용해 찾는다.

이 tilde 선택자를 사용하기 위해서 처음에 HTML 요소를 그렇게 짠 것이다. **`nav` 요소가 `section` 요소들의 뒤에서 같은 레벨에 존재하여야** 사용할 수 있기 때문이다.

CSS는 다음과 같다.

```css
.nav-menu:hover,
section#home:hover ~ nav a[href="#home"],
section#about:hover ~ nav a[href="#about"],
section#services:hover ~ nav a[href="#services"],
section#portfolio:hover ~ nav a[href="#portfolio"],
section#contact:hover ~ nav a[href="#contact"] {
  background-color: black;
  color: white;
}

```

화면에서 본다면 다음과 같이 마우스의 위치에 따라 네비게이션 요소의 스타일이 달라지는 것을 볼 수 있다.

![ezgif com-gif-maker (5) 복사본](https://user-images.githubusercontent.com/93521799/212328375-2572a8ed-d5e5-47e4-abe0-b3170d14579f.gif)


</br>

### 참고자료
[CSS 여러가지 선택자](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=kkrdiamond77&logNo=221148269517)