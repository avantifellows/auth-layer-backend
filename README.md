# auth-layer-backend

### Deployment
1. Install the Firebase CLI tools
    ```sh
    npm install -g firebase-tools
    ```
2. Log into Firebase using the Firebase CLI. It will prompt you to log in with your Google account.
    ```sh
    firebase login
    ```
3. Link the functions directory with Firebase CLI
    ```sh
    firebase init functions
    ```
4. Add your projects
    ```sh
    firebase use --add
    # this will ask you to select projects from a list of projects you have access to
    ```
6. Deploy the functions
    ```sh
    firebase deploy
    ```
    or deploy a specific function
    ```sh
    firebase deploy --only functions:function_name
    ```
7. Deploy a specific function to a specific project
   ```sh
   firebase deploy -P project_alias --only functions:function_name
   ```
