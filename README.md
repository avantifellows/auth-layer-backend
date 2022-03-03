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
4. Deploy the functions
    ```sh
    firebase deploy
    ```
    or deploy a specific function
    ```sh
    firebase deploy --only functions:function_name
    ```


firebase deploy --only functions:stagingCheckUser
firebase deploy --only functions:stagingGetGroupData

<!-- to add another project, run the command below -->
firebase use --add
