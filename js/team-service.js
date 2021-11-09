'use strict';

const STORAGE_KEY = 'teams';
const STORAGE_KEY_RESULTS = 'results';

var gTeams;

function getTeams(onSuccess) {
    var cachedTeams = loadFromStorage(STORAGE_KEY);
    if (cachedTeams) {
        onSuccess(cachedTeams);
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const teams = JSON.parse(xhr.responseText);
            saveToStorage(STORAGE_KEY, teams);
            onSuccess(teams);
        }
    }
    xhr.open('GET', 'https://worldcup.sfg.io/teams/');
    xhr.send();
}

function getTeamGames(onSuccess, team) {
    var cachedResults = loadFromStorage(STORAGE_KEY_RESULTS);
    if (cachedResults && cachedResults.every(result => cachedResults.includes(team))){
        onSuccess(cachedResults);
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const results = JSON.parse(xhr.responseText);
            saveToStorage(STORAGE_KEY_RESULTS,results);
            onSuccess(results);
        }
    }

    xhr.open('GET', `https://worldcup.sfg.io/matches/country?fifa_code=${team}`);
    xhr.send();
}