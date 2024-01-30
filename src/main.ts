import "./style.css";
import { switchPage } from "./page/switchPage";
import { myFormStore as store } from "./myFormStore/formStore";
import typescriptLogo from "./typescript.svg";

const setupPageLink = (aTagId: string, pageNumber: number) => {
    const link = document.querySelector<HTMLAnchorElement>(aTagId);

    if (!link) return;
    link.onclick = (event) => {
        event.preventDefault();

        store.setState((state) => {
            state.activePage = pageNumber;
            return state;
        });
    };
};

const updateActivePageLink = (activePage: number) => {
    const crumbLinks = document.querySelectorAll("li.crumb a");

    crumbLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.id === `PageLink${activePage}`) {
            link.classList.add("active");
        }
    });
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1><img src="${typescriptLogo}" class="logo vanilla"> Vanilla TS State Container Demo</h1>
  <hr>

  <nav class="crumbs">
    <ul>
      <li class="crumb"><a id="PageLink1" href="#">Basic Info</a></li>
      <li class="crumb"><a id="PageLink2" href="#">Address</a></li>
      <li class="crumb"><a id="PageLink3" href="#">Form Summary</a></li>
    </ul>
  </nav>

  
  <div id="Page"></div>
`;

setupPageLink("#PageLink1", 1);
setupPageLink("#PageLink2", 2);
setupPageLink("#PageLink3", 3);

const unobserve = store.observe(
    (state) => state.activePage,
    (activePage) => {
        updateActivePageLink(activePage);
        switchPage(activePage);
    },
);
