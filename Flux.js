/*

Flux is probably better explained by explaining its individual components:

Actions - Helper methods that facilitate passing data to the Dispatcher
Dispatcher - Receives actions and broadcasts payloads to registered callbacks
Stores - Containers for application state & logic that have callbacks registered to the dispatcher
Controller Views - React Components that grab the state from Stores and pass it down via props to child components. 
dfs


*/
