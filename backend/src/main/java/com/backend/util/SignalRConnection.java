package com.backend.util;

import com.microsoft.signalr.HubConnection;
import com.microsoft.signalr.HubConnectionBuilder;
import io.reactivex.Single;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SignalRConnection {

    @Value("${azure.signalr.connection-string}")
    private String connectionString;



    public void connect() {
        String hubName = "Message";
        String hubConnectionString = connectionString + "/client/?hub=" + hubName;

        HubConnection hubConnection = HubConnectionBuilder
                .create(hubConnectionString)
                .withAccessTokenProvider(Single.defer(() -> {
                    return Single.just("AccessToken");
                })).build();

        hubConnection.on("SendMessage", (user, message) -> {
            // Replace this line with what you want to do with the received message
            System.out.println("Received message from " + user + ": " + message);
        }, String.class, String.class);

        try {
            hubConnection.start().blockingAwait();
        } catch (Exception e){
            e.printStackTrace();
        }


    }


}
