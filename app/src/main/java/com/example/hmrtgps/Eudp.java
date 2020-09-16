package com.example.hmrtgps;

import android.os.AsyncTask;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import static com.example.hmrtgps.MainActivity.ip;
import static com.example.hmrtgps.MainActivity.ipr;
import static com.example.hmrtgps.MainActivity.message;
import static com.example.hmrtgps.MainActivity.puertoudp;
import static com.example.hmrtgps.MainActivity.puertoudpp;

public class Eudp extends AsyncTask<String,Void, Void>{
        DatagramSocket med;
        @Override
    protected Void doInBackground(String... strings) {
        try {
            med= new DatagramSocket();
            byte[] m = message.getBytes();
            InetAddress IPA = InetAddress.getByName(ip);
            InetAddress IPA1 = InetAddress.getByName(ipr);
            DatagramPacket packet = new DatagramPacket(m,m.length,IPA, Integer.parseInt(puertoudp));
            DatagramPacket packet1 = new DatagramPacket(m,m.length,IPA1, Integer.parseInt(puertoudpp));
            med.send(packet);
            med.send(packet1);
            med.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
