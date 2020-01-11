module.exports = async (client, ws)=>{
        client.on('error', async (data) =>{
            ws.send(JSON.stringify(data))
             // console.log('~~~~~~~~error~~~~~~~~~~', data)
        })
        client.on('auth-needed', async (data) =>{
             console.log('~~~~~~~~auth-needed~~~~~~~~~~', data)
        })
        client.on('auth-not-needed', async () =>{
             console.log('~~~~~~~~auth-not-needed~~~~~~~~~~')
        })
     client.on('destroy', async () =>{
         console.log('~~~~~~~~destroy~~~~~~~~~~')
    })
     client.on('response', async (data) =>{
        switch (data['_']) {
            case 'updateUserChatAction':
                // ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~updateUserChatAction~~~~~~~', data)
                break
            case 'updateChatReadOutbox':
                // ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~updateChatReadOutbox~~~~~~~', data)
                break
            case 'updateMessageEdited':
                // ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~updateMessageEdited~~~~~~~', data)
                break
            case 'updateMessageContent':
                ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~updateMessageContent~~~~~~~', data)
                break
            case 'updateBasicGroup':
                // ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~updateBasicGroup~~~~~~~', data)
                break
            case 'authorizationStateWaitPhoneNumber':
                ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~response~~~authorizationStateWaitPhoneNumber~~~~~~~', data)
                break
            case 'updateConnectionState':
               // ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~updateConnectionState~~~~~~~', data)
                break
            case 'updateHavePendingNotifications':
               // ws.send(JSON.stringify(data))
               //   console.log('~~~~~~~~~response~~~updateHavePendingNotifications~~~~~~~', data)
                break
            case 'text':
               // ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~text~~~~~~~', data)
                break
            case 'updateUser':
                console.log('~~~~~~~~~response~~~updateUser~~~~~~~', data)
               ws.send(JSON.stringify(data))
                break
            case 'updateScopeNotificationSettings':
               // ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~updateScopeNotificationSettings~~~~~~~', data)
                break
            case 'updateSelectedBackground':
               // ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~updateSelectedBackground~~~~~~~', data)
                break
            case 'ok':
               // ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~ok~~~~~~~', data)
                break
            case 'updateAuthorizationState':
               ws.send(JSON.stringify(data))
                break
            case 'updateOption':
               // ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~updateOption~~~~~~~', data)
                break
            case 'updateUserStatus':
               ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~response~~~updateUserStatus~~~~~~~', data)
                break
            case 'updateSupergroupFullInfo':
               ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~response~~~updateSupergroupFullInfo~~~~~~~', data)
                break
            case 'updateChatPinnedMessage':
               // ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~updateChatPinnedMessage~~~~~~~', data)
                break
            case 'updateSupergroup':
               ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~response~~~updateSupergroup~~~~~~~', data)
                break
            case 'user':
                 ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~response~~~user~~~~~~~', data)
                break
            case 'users':
               ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~response~~~users~~~~~~~', data)
                break
            case 'userProfilePhotos':
               ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~response~~~userProfilePhotos~~~~~~~', data)
                break
            case 'authorizationStateReady':
                ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~authorizationStateReady~~~~~~~', data)
                break
            case 'updateChatLastMessage':
               // console.assert(false)
                ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~response~~~updateChatLastMessage~~~~~~~', data)
                break
            case 'updateDeleteMessages':
                // console.assert(false)
                ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~updateDeleteMessages~~~~~~~', data)
                break
            case 'error':
                ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~error~~~~~~~', data)
                break
            case 'updateNewChat':
                ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~updateNewChat~~~~~~~', data)
                break
            case 'authorizationStateLoggingOut':
                ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~response~~~authorizationStateLoggingOut~~~~~~~', data)
                break
            case 'authorizationStateWaitPassword':
                // ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~response~~~authorizationStateWaitPassword~~~~~~~', data)
                break
            case 'authorizationStateWaitCode':
                ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~response~~~authorizationStateLoggingOut~~~~~~~', data)
                break
            case 'userFullInfo':
                ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~response~~~userFullInfo~~~~~~~', data)
                break
            case 'chat':
                ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~response~~~chat~~~~~~~', data)
                break
            case 'updateChatNotificationSettings':
                // ws.send(JSON.stringify(data))
                 console.log('~~~~response~~~~~updateChatNotificationSettings~~~~~~~~~~', data)
                break
            case 'updateNewMessage':
                ws.send(JSON.stringify(data))
                console.log('~~~~response~~~~~updateNewMessage~~~~~~~~~~', data)
                break
            case 'updateChatReadInbox':
                // ws.send(JSON.stringify(data))
                 console.log('~~~~response~~~~~updateChatReadInbox~~~~~~~~~~', data)
                break
            case 'updateUserFullInfo':
                ws.send(JSON.stringify(data))
                 console.log('~~~~response~~~~~updateUserFullInfo~~~~~~~~~~', data)
                break
            default:
                 console.log('~~~~~~~~~response~~~~~~~~~~', data['_'])
                break
        }
    })
      client.on('update', async (data) => {
        switch (data['_']) {
            case 'updateOption':
               // ws.send(JSON.stringify(data))
               //   console.log('~~~~update~~~~~updateOption~~~~~~~~~~', data)
                break
            case 'updateAuthorizationState':
               // ws.send(JSON.stringify(data))
               //   console.log('~~~~update~~~~~updateAuthorizationState~~~~~~~~~~', data)
                break
            case 'updateSelectedBackground':
               // ws.send(JSON.stringify(data))
               //   console.log('~~~~~update~~~~updateSelectedBackground~~~~~~~~~~', data)
                break
            case 'updateMessageContent':
                // ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~update~~~updateMessageContent~~~~~~~', data)
                break
            case 'authorizationStateWaitTdlibParameters':
                // ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~update~~~authorizationStateWaitTdlibParameters~~~~~~~', data)
                break
            case 'authorizationStateWaitPassword':
                // ws.send(JSON.stringify(data))
                 console.log('~~~~~~~~~update~~~authorizationStateWaitPassword~~~~~~~', data)
                break
            case 'updateDeleteMessages':
                // console.assert(false)
                // ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~update~~~updateDeleteMessages~~~~~~~', data)
            case 'updateConnectionState':
               // ws.send(JSON.stringify(data))
               //   console.log('~~~~~update~~~~updateConnectionState~~~~~~~~~~', data)
                break
            case 'updateNewChat':
                // ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~update~~~updateNewChat~~~~~~~', data)
                break
            case 'updateHavePendingNotifications':
               // ws.send(JSON.stringify(data))
               //   console.log('~~~~~~~~~updateHavePendingNotifications~~~~~~~~~~', data)
                break
            case 'updateUser':
               // // ws.send(JSON.stringify(data))
               //   console.log('~~~~~~update~~~updateUser~~~~~~~~~~', data['user'])
                break
            case 'updateScopeNotificationSettings':
               // ws.send(JSON.stringify(data))
               //   console.log('~~~~~update~~~~updateScopeNotificationSettings~~~~~~~~~~', data)
                break
            case 'updateSupergroup':
               // ws.send(JSON.stringify(data))
               //   console.log('~~~~~~update~~~updateSupergroup~~~~~~~~~~', data)
                break
            case 'updateUserStatus':
               // ws.send(JSON.stringify(data))
               //   console.log('~~~~update~~~~~updateUserStatus~~~~~~~~~~', data)
                break
            case 'updateChatLastMessage':
                console.log('~~~~update~~~~~updateChatLastMessage~~~~~~~~~~', data)
                // ws.send(JSON.stringify(data))
                break
            case 'updateUserChatAction':
                // ws.send(JSON.stringify(data))
                console.log('~~~~update~~~~~updateUserChatAction~~~~~~~~~~', data)
                break
            case 'updateUserFullInfo':
                // ws.send(JSON.stringify(data))
                console.log('~~~~update~~~~~updateUserFullInfo~~~~~~~~~~', data)
                break
            case 'updateChatNotificationSettings':
                // ws.send(JSON.stringify(data))
                console.log('~~~~update~~~~~updateChatNotificationSettings~~~~~~~~~~', data)
                break
            case 'updateNewMessage':
                // ws.send(JSON.stringify(data))
                console.log('~~~~update~~~~~updateNewMessage~~~~~~~~~~', data)
                break
            case 'updateSupergroupFullInfo':

                // console.log('~~~~~~~~~update~~~updateSupergroupFullInfo~~~~~~~', data)
                break
            case 'updateChatPinnedMessage':
                // ws.send(JSON.stringify(data))
                console.log('~~~~~~~~~update~~~updateChatPinnedMessage~~~~~~~', data)
                break
            case 'updateChatReadInbox':
                // ws.send(JSON.stringify(data))
                console.log('~~~~update~~~~~updateChatReadInbox~~~~~~~~~~', data)
                break
            default:
                 console.log('~~~~~update~~~~default~~~~~~~~~~', data)
                break
        }
    })
    return client
}