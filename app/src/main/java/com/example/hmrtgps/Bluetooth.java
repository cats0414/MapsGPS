package com.example.hmrtgps;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.hp.bluetoothjhr.BluetoothJhr;

public class Bluetooth extends AppCompatActivity {
    ListView ListaDispositivos;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity2);
        ListaDispositivos = (ListView) findViewById(R.id.ListaDispositivos);
        final BluetoothJhr bluetoothJhr = new BluetoothJhr(this, ListaDispositivos);
        bluetoothJhr.EncenderBluetooth();
        ListaDispositivos.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                bluetoothJhr.Disp_Seleccionado(view,position,MainActivity.class);
            }
        });
    }
}
