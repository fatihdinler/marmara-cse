#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/adc.h"
#include "esp_adc_cal.h"

#define DEFAULT_VREF    1100        
#define NO_OF_SAMPLES   64          

static esp_adc_cal_characteristics_t *adc_chars;
static const adc_channel_t channel = ADC_CHANNEL_6;    
static const adc_atten_t atten = ADC_ATTEN_DB_11;
static const adc_unit_t unit = ADC_UNIT_1;



static void check_efuse(void) {
    if (esp_adc_cal_check_efuse(ESP_ADC_CAL_VAL_EFUSE_TP) == ESP_OK) {
        printf("eFuse Two Point: Supported\n");
    } else {
        printf("eFuse Two Point: NOT supported\n");
    }
    if (esp_adc_cal_check_efuse(ESP_ADC_CAL_VAL_EFUSE_VREF) == ESP_OK) {
        printf("eFuse Vref: Supported\n");
    } else {
        printf("eFuse Vref: NOT supported\n");
    }
}

static void print_char_val_type(esp_adc_cal_value_t val_type) {
    if (val_type == ESP_ADC_CAL_VAL_EFUSE_TP) {
        printf("Characterized using Two Point Value\n");
    } else if (val_type == ESP_ADC_CAL_VAL_EFUSE_VREF) {
        printf("Characterized using eFuse Vref\n");
    } else {
        printf("Characterized using Default Vref\n");
    }
}

void app_main(void) {
    adc1_config_width(ADC_WIDTH_BIT_12);
    adc1_config_channel_atten(channel, atten);
    adc_chars = calloc(1, sizeof(esp_adc_cal_characteristics_t));
    esp_adc_cal_value_t val_type = esp_adc_cal_characterize(unit, atten, ADC_WIDTH_BIT_12, DEFAULT_VREF, adc_chars);
    print_char_val_type(val_type);

    while (1) {
        uint32_t adc_reading = 0;
        for (int i = 0; i < NO_OF_SAMPLES; i++) {
            adc_reading += adc1_get_raw((adc1_channel_t)channel);
        }
        adc_reading /= NO_OF_SAMPLES;
        uint32_t voltage = esp_adc_cal_raw_to_voltage(adc_reading, adc_chars);
        printf("Raw: %d\tVoltage: %dmV\n", adc_reading, voltage);
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}



/*ESP32'de analog-dijital çeviriciyi (ADC) kullanarak ışık şiddetini ölçmek için yazılmıştır. İşte adım adım açıklaması:

    ESP_ADC_CAL_CHARACATERSİTİCS_T: ADC okumalarını kalibre etmek için kullanılan bir yapı.

    Check_efuse Fonksiyonu: Bu fonksiyon, ESP32'nin eFuse özelliklerini kontrol eder. eFuse, çip üzerinde kalıcı olarak saklanan ayarları içerir.

    App_main Fonksiyonu:
        ADC Konfigürasyonu: ADC1 kanalı ve zayıflatma (atten) ayarlanır.
        ADC Okuma Döngüsü: Belirlenen sayıda örnek alınır ve ortalama değer hesaplanır.
        Gerilim Dönüşümü: ADC okuması milivolta çevrilir ve ekrana basılır.

    Veri Toplama: Her 1 saniyede bir ADC'den veri okunur, ortalama alınır ve gerilim değeri hesaplanır.

Kod, bitki büyümesi için ışık şiddetini izlemek üzere tasarlanmıştır ve sürekli olarak ışık şiddetini ölçer. Bu bilgiler, bitki büyümesinin izlenmesi ve yönetilmesi için kullanılabilir.*/