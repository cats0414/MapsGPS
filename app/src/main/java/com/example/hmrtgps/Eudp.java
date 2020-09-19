package com.example.hmrtgps;

import android.os.AsyncTask;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import static com.example.hmrtgps.MainActivity.ipr;
import static com.example.hmrtgps.MainActivity.message;


public class Eudp extends AsyncTask<String,Void, Void>{
        DatagramSocket med;
        @Override

    protected Void doInBackground(String... strings) {
        try {
            med= new DatagramSocket();
            byte[] m = message.getBytes();
            InetAddress IPA = InetAddress.getByName("34.238.181.248");
            InetAddress IPA1 = InetAddress.getByName("18.204.168.161");
            InetAddress IPA2 = InetAddress.getByName("34.236.68.62");
            DatagramPacket packet = new DatagramPacket(m,m.length,IPA, 3659);
            DatagramPacket packet1 = new DatagramPacket(m,m.length,IPA1, 3659);
            DatagramPacket packet2 = new DatagramPacket(m,m.length,IPA2, 3659);
            med.send(packet);
            med.send(packet1);
            med.send(packet2);
            med.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
