<?php

namespace Service;

/**
 * Class landa digunakan untuk menyimpan method global.
 */
class Landa
{
    /**
     * Upload gambar.
     *
     * @param mixed $path
     * @param mixed $base64
     *
     * @return string nama file
     */
    public function base64ToImage($path, $base64)
    {
        try {
            $image_parts = explode(';base64,', $base64);
            $image_type_aux = explode('image/', $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $namaFile = uniqid().'.'.$image_type;
            if (!is_dir($path)) {
                mkdir($path, 0777,true);
            }
            $file = $path.$namaFile;
            file_put_contents($file, $image_base64);

            return [
                'status' => true,
                'data' => $namaFile,
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * buildTree.
     *
     * @param array $elements array yang akan dijadikan struktur tree
     * @param int   $parentId id induk
     *
     * @return array
     */
    public function buildTree(array $elements, $parentId = 0)
    {
        $branch = [];
        foreach ($elements as $element) {
            if ($element['parent_id'] == $parentId) {
                $children = $this->buildTree($elements, $element['id']);
                if ($children) {
                    $element['children'] = $children;
                } else {
                    $element['children'] = [];
                }
                $branch[] = $element;
            }
        }

        return $branch;
    }

    /**
     * Simpan base 64 ke file PDF.
     *
     * @param array  $base64
     * @param string $path
     * @param string $custom_name
     *
     * @return array
     */
    public function saveBase64TMP($base64, $path, $custom_name = null)
    {
        try {
            if (isset($base64['base64'])) {
                $extension = substr($base64['filename'], strrpos($base64['filename'], ',') + 1);

                if (!empty($custom_name)) {
                    $nama = $custom_name;
                } else {
                    $nama = $base64['filename'];
                }
                $file = base64_decode($base64['base64']);
                file_put_contents($path.'/'.$nama, $file);

                return [
                    'status' => true,
                    'fileName' => $nama,
                    'filePath' => $path.'/'.$nama,
                ];
            }
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * base64ToFile.
     *
     * @param mixed $data
     *
     * @return array file detail
     */
    public function base64ToFile($data)
    {
        try {
            if (isset($data['base64']) && !empty($data['base64'])) {
                $batas = strpos($data['base64'], 'base64,');
                $batas_potong = $batas + 7;
                $data['base64'] = substr($data['base64'], $batas_potong);

                $folder = 'assets/excel';

                if (!is_dir($folder)) {
                    mkdir($folder, 0777);
                }

                $save = $this->saveBase64TMP($data, $folder);

                if ($save['status']) {
                    return [
                        'status' => true,
                        'data' => [
                            'fileName' => $save['fileName'],
                            'filePath' => $save['filePath'],
                        ],
                    ];
                }

                return [
                    'status' => false,
                    'error' => $save['error'],
                ];
            }
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    public function base64ToFilePath($data, $path, $kode)
    {
        try {
            if (isset($data['base64']) && !empty($data['base64'])) {
                // $batas = strpos($data['base64'], 'base64,');
                // $batas_potong = $batas + 7;
                // $data['base64'] = substr($data['base64'], $batas_potong);

                $folder = $path;

                if (!is_dir($folder)) {
                    mkdir($folder, 0777);
                }
                $nama_custom = $kode.'_'.$data['filename'];

                $save = $this->saveBase64TMP($data, $folder, $nama_custom);

                if ($save['status']) {
                    return [
                        'status' => true,
                        'data' => [
                            'fileName' => $save['fileName'],
                            'filePath' => $save['filePath'],
                        ],
                    ];
                }

                return [
                    'status' => false,
                    'error' => $save['error'],
                ];
            }
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Konversi array ke tanggal.
     *
     * @param mixed $tglArr
     */
    public function arrayToDate($tglArr)
    {
        if (!empty($tglArr)) {
            $tahun = isset($tglArr['year']) ? $tglArr['year'] : date('Y');
            $bulan = isset($tglArr['month']) ? $tglArr['month'] : date('m');
            $hari = isset($tglArr['day']) ? $tglArr['day'] : date('d');

            return $tahun.'-'.$bulan.'-'.$hari;
        }

        return null;
    }

    public function objectToDate($tglArr)
    {
        if (!empty($tglArr)) {
            $tahun = isset($tglArr->year) ? $tglArr->year : date('Y');
            $bulan = isset($tglArr->month) ? $tglArr->month : date('m');
            $hari = isset($tglArr->day) ? $tglArr->day : date('d');

            return $tahun.'-'.$bulan.'-'.$hari;
        }

        return null;
    }

    /**
     * Enkripsi string.
     *
     * @param string $string
     *
     * @return string
     */
    public function safeString($string)
    {
        $iv = substr(hash('sha256', 'humanis2020*'), 0, 16);

        return openssl_encrypt($string, 'AES-256-CBC', 'encryptionhash', 0, $iv);
    }

    /**
     * Decript string.
     *
     * @param string $encryptedText
     *
     * @return string
     */
    public function unsafeString($encryptedText)
    {
        $iv = substr(hash('sha256', 'humanis2020*'), 0, 16);

        return openssl_decrypt($encryptedText, 'AES-256-CBC', 'encryptionhash', 0, $iv);
    }

    /**
     * id Karyawan.
     *
     * @param null|mixed $userId
     * @param null|mixed $clientId
     *
     * @return string
     */
    public function idKaryawan($userId = null, $clientId = null)
    {
        $user = empty($userId) ? $_SESSION['user']['id'] : $userId;
        $client = empty($clientId) ? $_SESSION['user']['client'] : $clientId;

        return $user.'_'.$client;
    }

    public function indonesian_date($timestamp = '', $date_format = 'j F Y', $suffix = '')
    {
        if ('' == trim($timestamp)) {
            $timestamp = time();
        } elseif (!ctype_digit($timestamp)) {
            $timestamp = strtotime($timestamp);
        }
        // remove S (st,nd,rd,th) there are no such things in indonesia :p
        $date_format = preg_replace('/S/', '', $date_format);
        $pattern = [
            '/Mon[^day]/', '/Tue[^sday]/', '/Wed[^nesday]/', '/Thu[^rsday]/',
            '/Fri[^day]/', '/Sat[^urday]/', '/Sun[^day]/', '/Monday/', '/Tuesday/',
            '/Wednesday/', '/Thursday/', '/Friday/', '/Saturday/', '/Sunday/',
            '/Jan[^uary]/', '/Feb[^ruary]/', '/Mar[^ch]/', '/Apr[^il]/', '/May/',
            '/Jun[^e]/', '/Jul[^y]/', '/Aug[^ust]/', '/Sep[^tember]/', '/Oct[^ober]/',
            '/Nov[^ember]/', '/Dec[^ember]/', '/January/', '/February/', '/March/',
            '/April/', '/June/', '/July/', '/August/', '/September/', '/October/',
            '/November/', '/December/',
        ];
        $replace = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min',
            'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu',
            'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des',
            'Januari', 'Februari', 'Maret', 'April', 'Juni', 'Juli', 'Agustus', 'Sepember',
            'Oktober', 'November', 'Desember',
        ];
        $date = date($date_format, $timestamp);
        $date = preg_replace($pattern, $replace, $date);

        return "{$date} {$suffix}";
    }
}
