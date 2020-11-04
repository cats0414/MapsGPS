package com.example.hmrtgps;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.hp.bluetoothjhr.BluetoothJhr;

public class Bluetooth extends AppCompatActivity {
    ListView Lista;
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity2);
        Lista=(ListView)findViewById(R.id.disp);
        final BluetoothJhr bluetoothJhr= new BluetoothJhr(this,Lista);
        bluetoothJhr.EncenderBluetooth();
        Lista.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            bluetoothJhr.Disp_Seleccionado(view,position,MainActivity.class);
            }
        });
    }
    public void setContentView(int activity2) {
    }
}
