package com.example.hmrtgps;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.SensorManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.location.LocationProvider;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.widget.Switch;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import com.example.hp.bluetoothjhr.BluetoothJhr;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ScheduledExecutorService;


public class MainActivity extends AppCompatActivity {
    TextView latitud,longitud;
    TextView direccion, text;
    String x="0";
    Switch switchE;
    SensorManager sm;
    boolean id=false;
    int n=1;
    int n1=1;
    public static String message;
    private Context wh=this;
    BluetoothJhr bluetoothJhr2;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        latitud = (TextView) findViewById(R.id.txtLatitud);
        longitud = (TextView) findViewById(R.id.txtLongitud);
        direccion = (TextView) findViewById(R.id.txtDireccion);
        bluetoothJhr2=new BluetoothJhr(Bluetooth.class,wh);
        text= (TextView) findViewById(R.id.txt);
        /*new rec().start();*/
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.ICE_CREAM_SANDWICH) {
            switchE= (Switch) findViewById(R.id.switch1);
        }

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
         ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION,}, 1000);
       } else {
         locationStart();
       }
    }
    @Override
    public void onResume() {
        super.onResume();
        if(bluetoothJhr2.DireccionMac()==""||bluetoothJhr2.DireccionMac()==null||bluetoothJhr2.DireccionMac()=="null"){
        }else{
        bluetoothJhr2.ConectaBluetooth();
    }}
    @Override
    public  void onPause(){
        super.onPause();
    }
    private void locationStart() {
        LocationManager mlocManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        Localizacion Local = new Localizacion();
        Local.setMainActivity(this);
        final boolean gpsEnabled = mlocManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
        if (!gpsEnabled) {
            Intent settingsIntent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
            startActivity(settingsIntent);
        }
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION,}, 1000);
            return;
        }
        mlocManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, (LocationListener) Local);
        mlocManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, (LocationListener) Local);
        latitud.setText("Localización agregada");
        if(n==1){
            text.setText("Turn it enable to start");
        }

    }
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (requestCode == 1000) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                locationStart();
                return;
            }

        }
    }
    ScheduledExecutorService executor = null;
    public void envio(View view) {
        n = n+1;
            final Handler handler = new Handler();
            final Timer timer = new Timer();
            TimerTask task = new TimerTask() {
                @Override
                public void run() {
                    handler.post(new Runnable() {
                        public void run() {
                            try {
                                Eudp eu = new Eudp();
                                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.CUPCAKE) {
                                    eu.execute();
                                }
                            } catch (Exception e) {
                                Log.e("error", e.getMessage());
                            }
                            if((n % 2) == 0){
                                text.setText("Sending.....");
                            } else {
                                text.setText("Turn me on!");
                                timer.cancel();
                                timer.purge();
                            }
                        }
                    });
                }
            };

        timer.schedule(task, 0, 5000);

    }

    public void id(View view) {
        n1=n1+1;
        if((n1 % 2) == 0){
            id=true;
        } else {
            id=false;
        }
    }

    private void Delay(){
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    /* Aqui empieza la Clase Localizacion */
    public class Localizacion implements LocationListener {
        MainActivity mainActivity;
        public MainActivity getMainActivity() {
            return mainActivity;
        }
        public void setMainActivity(MainActivity mainActivity) {
            this.mainActivity = mainActivity;
        }
        @Override
        public void onLocationChanged(Location loc) {
            // Este metodo se ejecuta cada vez que el GPS recibe nuevas coordenadas
            // debido a la deteccion de un cambio de ubicacion
            x="";
            loc.getLatitude();
            loc.getLongitude();
            Delay();
            String ss= System.getProperty("line.separator");
            if(bluetoothJhr2.Rx() != null && bluetoothJhr2.Rx() != "null" && bluetoothJhr2.Rx() != "" && bluetoothJhr2.Rx() != "null7"&& bluetoothJhr2.Rx() != "null1"
                    && bluetoothJhr2.Rx() != "null2"&& bluetoothJhr2.Rx() != "null3"&& bluetoothJhr2.Rx() != "null4"&& bluetoothJhr2.Rx() != "null5"
                    && bluetoothJhr2.Rx() != "null6"&& bluetoothJhr2.Rx() != "null7"&& bluetoothJhr2.Rx() != "null8"&& bluetoothJhr2.Rx() != "null9"){
                x=bluetoothJhr2.Rx();

            }else{
                x="Nada";
            }
            String sLatitud = String.valueOf(loc.getLatitude());
            String sLongitud = String.valueOf(loc.getLongitude());
            latitud.setText("Latitud= " +sLatitud);
            longitud.setText("Longitud= "+sLongitud);
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String fecha = dateFormat.format(new Date()); // Find todays date
            direccion.setText(fecha);
            String idd=",1";
            String iddx=",2";
            //Latitud, Longitud,fecha
            String jui= String.format(String.format("%%s,%%s,%s",fecha),sLatitud,sLongitud);
            String mnsa=jui.concat(",");
            String mns=mnsa.concat(x);
            final String men =mns.concat(idd);
            final String men1 =mns.concat(iddx);
            if(id) {
                message = men1;
            }else{
                message= men;
            }
        }



        @Override
        public void onProviderDisabled(String provider) {
            // Este metodo se ejecuta cuando el GPS es desactivado
            latitud.setText("GPS Desactivado");
        }
        @Override
        public void onProviderEnabled(String provider) {
            // Este metodo se ejecuta cuando el GPS es activado
            latitud.setText("GPS Activado");
        }
        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {
            switch (status) {
                case LocationProvider.AVAILABLE:
                    Log.d("debug", "LocationProvider.AVAILABLE");
                    break;
                case LocationProvider.OUT_OF_SERVICE:
                    Log.d("debug", "LocationProvider.OUT_OF_SERVICE");
                    break;
                case LocationProvider.TEMPORARILY_UNAVAILABLE:
                    Log.d("debug", "LocationProvider.TEMPORARILY_UNAVAILABLE");
                    break;
            }
        }

    }
    }


