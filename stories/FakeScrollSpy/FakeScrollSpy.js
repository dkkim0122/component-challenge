import './FakeScrollSpy.css'

export const createFakeScrollSpy = () => {
  const container = document.createElement('article')
  container.id = 'article'

  const nav = document.createElement('nav')
  nav.classList.add('nav')
  const navBar = `
      <a href="#home" class="nav-menu"><span>Home</span></a>
      <a href="#about" class="nav-menu"><span>About</span></a>
      <a href="#services" class="nav-menu"><span>Services</span></a>
      <a href="#portfolio" class="nav-menu"><span>Portfolio</span></a>
      <a href="#contact" class="nav-menu"><span>Contact</span></a>
  `
  nav.innerHTML = navBar

  const main = document.createElement('main')
  const mainSections = `
  <ul>
    <li class="section"><span>Home Section</span></li>
    <li class="section"><span>About Section</span></li>
    <li class="section"><span>Services Section</span></li>
    <li class="section"><span>Portfolio Section</span></li>
    <li class="section"><span>Contact Section</span></li>
  </ul>
  `
  main.innerHTML = mainSections

  container.appendChild(nav)
  container.appendChild(main)

  return container
}
