import { createPageOne } from "./createPageOne";
import { createPageTwo } from "./createPageTwo";
import { createSummaryPage } from "./createSummaryPage";

export const switchPage = (pageNumber: number) => {
    const pageSlotId = "#Page";
    const page = document.querySelector(pageSlotId);
    if (!page) return;

    // wipe page content
    page.innerHTML = "";

    // re-create
    switch (pageNumber) {
        case 1:
            createPageOne(pageSlotId);
            break;
        case 2:
            createPageTwo(pageSlotId);
            break;
        case 3:
            createSummaryPage(pageSlotId);
            break;
        default:
            break;
    }
};
