import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Clear existing
  await prisma.screeningAnswer.deleteMany()
  await prisma.screeningQuestion.deleteMany()
  await prisma.document.deleteMany()
  await prisma.certificate.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.registration.deleteMany()
  await prisma.slot.deleteMany()
  await prisma.location.deleteMany()
  await prisma.vaccine.deleteMany()
  await prisma.patient.deleteMany()
  await prisma.user.deleteMany()

  // Admin User
  const adminPassword = await bcrypt.hash('rssg123', 10)
  const admin = await prisma.user.create({
    data: {
      name: 'Admin RSSG',
      email: 'admin', // Kita gunakan 'admin' sebagai identifier login
      role: 'ADMIN',
      password_hash: adminPassword
    }
  })

  // Petugas User
  const petugasPassword = await bcrypt.hash('petugas123', 10)
  const petugas = await prisma.user.create({
    data: {
      name: 'Petugas Vaksin',
      email: 'petugas@rssg.co.id',
      role: 'PETUGAS',
      password_hash: petugasPassword
    }
  })

  // Locations
  const locVaksin1 = await prisma.location.create({
    data: { name: 'Poli Vaksinasi Lantai 1', floor: 'Lantai 1' }
  })
  const locKIA = await prisma.location.create({
    data: { name: 'Poli KIA', floor: 'Lantai 2' }
  })

  // Vaccines
  const vaksins = [
    { name: 'Vaksin Meningitis ACWY', description: 'Wajib untuk umrah dan haji. Melindungi dari bakteri Neisseria meningitidis.', price: 350000, stock: 100 },
    { name: 'Vaksin Yellow Fever', description: 'Wajib untuk perjalanan ke negara endemis Demam Kuning (Afrika/Amerika Selatan).', price: 450000, stock: 50 },
    { name: 'Vaksin Influenza (Flu)', description: 'Pencegahan flu musiman, sangat dianjurkan untuk jamaah.', price: 250000, stock: 200 },
    { name: 'Vaksin Hepatitis A', description: 'Perlindungan terhadap peradangan hati akibat virus Hepatitis A.', price: 500000, stock: 80 },
    { name: 'Vaksin Hepatitis B (Dewasa)', description: 'Mencegah infeksi hati serius yang disebabkan virus Hepatitis B.', price: 150000, stock: 150 },
    { name: 'Vaksin Typhoid (Tipes)', description: 'Melindungi dari demam tifoid yang disebabkan bakteri Salmonella typhi.', price: 250000, stock: 120 },
    { name: 'Vaksin Rabies', description: 'Vaksin pencegahan pasca pajanan atau pra pajanan risiko tinggi.', price: 300000, stock: 30 },
    { name: 'Vaksin Polio', description: 'Mencegah penyakit kelumpuhan anak.', price: 200000, stock: 100 },
    { name: 'Vaksin Varicella (Cacar Air)', description: 'Mencegah infeksi virus varicella-zoster (cacar air).', price: 450000, stock: 60 },
    { name: 'Vaksin Pneumonia (PCV 13)', description: 'Melindungi dari infeksi paru yang disebabkan bakteri pneumokokus.', price: 950000, stock: 40 }
  ];

  for (const vax of vaksins) {
    await prisma.vaccine.create({ data: vax });
  }

  // Get some IDs for later (just in case)
  const allVaxes = await prisma.vaccine.findMany();
  const vMeningitis = allVaxes.find(v => v.name === 'Vaksin Meningitis ACWY');
  const vHepatitisB = allVaxes.find(v => v.name === 'Vaksin Hepatitis B (Dewasa)');

  // Questions
  await prisma.screeningQuestion.createMany({
    data: [
      { questionText: 'Pernah suntik vaksin meningitis sebelumnya, Bila ya, apakah timbul reaksi yang berat', category: 'Umum' },
      { questionText: 'Apakah sekarang sedang demam', category: 'Umum' },
      { questionText: 'Apakah ada alergi terhadap obat/ makanan/ zat tertentu, Bila ya, apakah timbul reaksi yang berat (sesak, pingsan)', category: 'Alergi' },
      { questionText: 'Apakah pernah alami luka disertai pendarahan yang sulit berhenti', category: 'Umum' },
      { questionText: 'Apakah sedang jalani terapi kanker atau penyakit gangguan imun', category: 'Riwayat Penyakit' },
      { questionText: 'Apakah mengonsumsi obat-obatan rutin setiap hari', category: 'Riwayat Obat' },
      { questionText: 'Apakah menderita penyakit otak seperti epilepsy/ enefalopati/ hysteria/ gejala sisa emsefalitis/ pendarahan otak/ infark otak/ infeksi/ keracunan', category: 'Riwayat Penyakit' },
      { questionText: 'Apakah menderita penyakit ginjal akut/ kronis', category: 'Riwayat Penyakit' },
      { questionText: 'Apakah menderita penyakit jantung bawaan', category: 'Riwayat Penyakit' },
      { questionText: 'Apakah menderita TBC aktif/ infeksi HIV', category: 'Riwayat Penyakit' },
      { questionText: 'Apakah akan/ sudah mendapatkan vaksinasi jenis lain hari ini', category: 'Umum' },
      { questionText: 'Apakah ada gejala batuk berdahak lebih dari 2 minggu?', category: 'Gejala TBC' },
      { questionText: 'Apakah ada gejala batuk disertai perdarahan?', category: 'Gejala TBC' },
      { questionText: 'Apakah ada gejala muncul keringat di malam hari tanpa aktivitas fisik?', category: 'Gejala TBC' },
      { questionText: 'Apakah ada penurunan berat badan tanpa penyebab yang jelas?', category: 'Gejala TBC' },
      { questionText: 'Apakah ada gejala sesak nafas dan nyeri dada?', category: 'Gejala TBC' },
      { questionText: 'Apakah pernah mengkonsumsi Obat Anti Tuberculosis (TBC)', category: 'Riwayat TBC' },
      { questionText: 'Apakah ada keluarga/rekan terdekat yang pernah sakit atau sedang dalam pengobatan TBC', category: 'Riwayat TBC' },
      { questionText: 'Bagi wanita usia subur (15-49 tahun) apakah sudah melakukan pemeriksaan kehamilan?', category: 'Kesehatan Wanita' }
    ]
  })

  // Demo Patient
  const patient = await prisma.patient.create({
    data: {
      nik: '1234567890123456',
      name: 'John Doe',
      birthdate: new Date('1990-01-01'),
      gender: 'L',
      phone: '081234567890',
      address: 'Jl. Merdeka No 1',
      no_rm: 'RM-001'
    }
  })

  // Slot
  const slotDate = new Date()
  slotDate.setHours(0, 0, 0, 0)
  const slot = await prisma.slot.create({
    data: {
      date: slotDate,
      locationId: locVaksin1.id,
      maxQuota: 50,
      currentQuota: 1
    }
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
