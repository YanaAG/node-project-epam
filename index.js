const { Stream, Transform } = require('stream');
const commander = require('commander');
const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');

const program = new commander.Command();

program.exitOverride();

// eslint-disable-next-line no-undef
const inputDirectory = path.join(__dirname, 'Input');
// eslint-disable-next-line no-undef
const outputDirectory = path.join(__dirname, 'Output');

function transformCommand(fileOutput, fileInput) {
    let filesToTransform = [];
    let filesToWrite = [];
    const readStream = fs.createReadStream;
    const writeStream = fs.createWriteStream;

    if (fileInput) {
        const fileInputPath = path.join(inputDirectory, '\\', fileInput);

        if (fs.existsSync(fileInputPath)) {
            filesToTransform.push(fileInputPath);
        } else {
            throw new Error(`File "${fileInput}" does not exist`);
        }
    } else {
        const files = fs.readdirSync(inputDirectory);

        for (let i = 0; i < files.length; i++) {
            filesToTransform.push(path.join(inputDirectory, '\\', files[i]));
        }
    }

    if (fileOutput) {
        if (filesToTransform.length === 1) {
            filesToWrite.push(path.join(outputDirectory, '\\', fileOutput));
        } else {
            const fileOutputName = fileOutput.split('.')[0];

            for (let i = 0; i < filesToTransform.length; i++) {
                const newFileName = fileOutputName + '_' + (i + 1) + '.json';

                filesToWrite.push(path.join(outputDirectory, '\\', newFileName));
            }
        }
    } else {
        for (let i = 0; i < filesToTransform.length; i++) {
            const filePath = filesToTransform[i].split('\\');
            const fileName = filePath[filePath.length - 1];
            const newFileName = fileName.split('.')[0] + '.json';

            filesToWrite.push(path.join(outputDirectory, '\\', newFileName));
        }
    }

    filesToTransform.forEach((file, index) => readStream(file)
                                                .pipe(csv())
                                                .pipe(writeStream(filesToWrite[index])));
}

function reverseCommand(textToReverse, MaxTextLength) {
    const text = textToReverse.join(' ');

    if (isNaN(parseInt(MaxTextLength))) {
        throw new Error('Length must be specified by a number');
    }

    if (text.length > MaxTextLength) {
        throw new Error('Text is too long');
    }

    const readableStream = new Stream.Readable({
        read() {}
    });
    const writableStream = new Stream.Writable();

    writableStream._write = (chunk, encoding, next) => {
        console.log(chunk.toString());
        next();
    };

    const reverseStream = new Transform({
        transform: (chunck, encoding, callback) => {
            callback(null, reverseString(chunck));
        }
    });

    function reverseString(str) {
        const string = str.toString().split('').reverse().join('');
        // eslint-disable-next-line no-undef
        return Buffer.from(string);
    }

    readableStream.pipe(reverseStream).pipe(writableStream);

    readableStream.push(text);
}

program
    .command('transform')
    .description('convert css files to json files')
    .option('-n, --name-output <file_output>', 'name for the file in the output directory')
    .option('-f, --file <file_input>', 'file name for transformation from input folder')
    .action((cmdOpts) => {
        try {
            transformCommand(cmdOpts.nameOutput, cmdOpts.file);
        } catch(err) {
            console.log(err.message);
        }
    });

program
    .command('reverse <text...>')
    .description('reverse the text entered in the console')
    .option('-l, --length <text_length>', 'maximum length of entered text')
    .action((text, cmdOpts) => {
        try {
            reverseCommand(text, cmdOpts.length);
        } catch(err) {
            console.log(err.message);
        }
    });

try {
    // eslint-disable-next-line no-undef
    program.parse(process.argv);
} catch (err) {
    if (err.code === 'commander.unknownOption' || err.code === 'commander.unknownCommand') {
        console.log();
        program.outputHelp();
    }
}
