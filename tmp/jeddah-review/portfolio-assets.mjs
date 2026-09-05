import sharp from 'sharp';
for(const n of ['massing-catalogue','facade-radiation','form-development']) await sharp(`tmp/jeddah-review/${n}.png`).webp({quality:93}).toFile(`static-portfolio/assets/projects/arwad-tower-jeddah/${n}.webp`);
