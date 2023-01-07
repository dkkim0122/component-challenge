export const createFakeScrollSpy = () => {
  const container = document.createElement('article')

  const nav = document.createElement('nav')
  const navBar = `
    <ul>
      <li class="fake-scroll-spy__nav-menu"><a href="#home" class="fake-scroll-spy__nav-anchor"><span>Home</span></a></li>
      <li class="fake-scroll-spy__nav-menu"><a href="#about" class="fake-scroll-spy__nav-anchor"><span>About</span></a></li>
      <li class="fake-scroll-spy__nav-menu"><a href="#services" class="fake-scroll-spy__nav-anchor"><span>Services</span></a></li>
      <li class="fake-scroll-spy__nav-menu"><a href="#portfolio" class="fake-scroll-spy__nav-anchor"><span>Portfolio</span></a></li>
      <li class="fake-scroll-spy__nav-menu"><a href="#contact" class="fake-scroll-spy__nav-anchor"><span>Contact</span></a></li>
    </ul>
  `
  nav.innerHTML = navBar

  const main = document.createElement('main')
  const mainSections = `
  <ul>
    <li class="fake-scroll-spy__section"><span>Home Section</span></li>
    <li class="fake-scroll-spy__section"><span>About Section</span></li>
    <li class="fake-scroll-spy__section"><span>Services Section</span></li>
    <li class="fake-scroll-spy__section"><span>Portfolio Section</span></li>
    <li class="fake-scroll-spy__section"><span>Contact Section</span></li>
  </ul>
  `
  main.innerHTML = mainSections

  container.appendChild(nav)
  container.appendChild(main)

  return container
}
