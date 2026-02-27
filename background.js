const targetPages = [
    "https://dataride.uci.ch/iframe/RankingDetails/156?disciplineId=7&groupId=39&momentId=198375&disciplineSeasonId=453&rankingTypeId=1&categoryId=23&raceTypeId=19",
    "https://dataride.uci.ch/iframe/RankingDetails/155?disciplineId=7&groupId=38&momentId=198380&disciplineSeasonId=453&rankingTypeId=1&categoryId=23&raceTypeId=92",
    "https://dataride.uci.ch/iframe/RankingDetails/148?disciplineId=7&groupId=35&momentId=198378&disciplineSeasonId=453&rankingTypeId=1&categoryId=22&raceTypeId=92",
    "https://dataride.uci.ch/iframe/RankingDetails/149?disciplineId=7&groupId=36&momentId=198372&disciplineSeasonId=453&rankingTypeId=1&categoryId=22&raceTypeId=19"
];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && targetPages.includes(tab.url)) {
        chrome.action.openPopup();
    }
});