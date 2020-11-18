package com.example.hmrtgps;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.hp.bluetoothjhr.BluetoothJhr;


public class Bienvenido extends AppCompatActivity {

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.welcome);

    }

    public void id(View view) {
        Intent intent = new Intent(this, Bluetooth.class);
        startActivity(intent);
    }
}
