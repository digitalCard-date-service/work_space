'use strict';

const sectionIdMap = {
  '#home': '#home',
  '#ad': '#ad',
  '#step1_': '#step1',
  '#step2_': '#step2',
  '#step3_': '#step3',
  '#start': '#start',
  '#contact': '#contact',
};

const navHrefIds = Object.keys(sectionIdMap);

const sectionIds = Object.values(sectionIdMap);

const sections = sectionIds.map((id) => document.querySelector(id));

const navItems = navHrefIds.map((id) => document.querySelector(`a[href="${id}"]`));

const visibleSections = sectionIds.map(() => false);

let activeNavItem = navItems[0];

const options = {
  rootMargin: '-20% 0px 0px 0px',
  threshold: [0, 0.98],
};

const observer = new IntersectionObserver(observerCallback, options);

sections.forEach((section) => {
  if (section) {
    observer.observe(section);
  }
});

function observerCallback(entries) {
  let selectLastOne = false;

  entries.forEach((entry) => {
    const index = sectionIds.indexOf(`#${entry.target.id}`);
    visibleSections[index] = entry.isIntersecting;

    if (
      index === sectionIds.length - 1 &&
      entry.isIntersecting &&
      entry.intersectionRatio >= 0.95
    ) {
      selectLastOne = true;
    }
  });

  const navIndex = selectLastOne
    ? sectionIds.length - 1
    : findFirstIntersecting(visibleSections);

  selectNavItem(navIndex);
}

function findFirstIntersecting(sections) {
  const index = sections.indexOf(true);
  return index >= 0 ? index : 0;
}

function selectNavItem(index) {
  const navItem = navItems[index];
  if (!navItem) return;

  activeNavItem.classList.remove('nav__active');
  activeNavItem = navItem;
  activeNavItem.classList.add('nav__active');
}
