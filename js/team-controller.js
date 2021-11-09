'use strict';

function onLoadTeams() {
    getTeams(renderTeams);
}

function renderTeams(teams) {
    const strHTMLs = teams.map(team => `<li><a href="#" onclick="onGetResults('${team.fifa_code}')">${team.country}</a></li>`);
    document.querySelector('.teams-container').innerHTML = strHTMLs.join('');
}

function onGetResults(team) {
    getTeamGames(renderGames, team);
}

function renderGames(results) {
    const strHTMLs = results.map(result => {
        return `<h2>TIme: ${result.datetime}, Venue: ${result.venue}: 
        </h2>
        <p>Teams: ${result.home_team_country} - ${result.away_team_country}, Result: ${result.home_team.goals} - ${result.away_team.goals}</p>
        `});
    document.querySelector('.matches').innerHTML = strHTMLs.join('');
}