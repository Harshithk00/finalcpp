const questionset1 = [{
    question: `Which of the following classes are used for file handling in C++?
                i) fstream ii) ifstream iii) ofstream iv) ostream`,
    options: ["i) and ii)","i) and iv)","i), ii), and iii)","all of the bove"],
    answer: "i), ii), and iii)"
},
{
    question: "Which of the following mode is used to open a file in binary mode?",
    options: ["ios::bin", "ios::binary", "ios::bins", "None of the above"],
    answer: "ios::binary"
},
{
    question: "What is the use of ios::trunc mode?",
    options: ["To open a file in input mode", "To open a file in output mode", "To truncate an existing file to half", "To truncate an existing file to zero"],
    answer: "To truncate an existing file to zero"
},
{
    question: "Which of the following is the default mode of the opening using the ofstream class?",
    options: ["ios::in", "ios::out", "ios::app", "ios::trunc"],
    answer: "ios::out"
},
{
    question: "What is the return type open() method?",
    options: ["int", "char", "bool", "float"],
    answer: "bool"
},
{
    question: "Which of the following is the default mode of the opening using the ifstream class?",
    options: ["ios::in ", "ios::out ", "ios::app ", "ios::trunc "],
    answer: "ios::in "
},
{
    question: "Which operator is used to insert the data into file?",
    options: [">>", "<<", "<", "None of the above"],
    answer: "<<"
},
{
    question: "Which is correct syntax?",
    options: ["myfile:open ('example.bin', ios::out);", "myfile.open ('example.bin', ios::out);", "myfile::open ('example.bin', ios::out);", "myfile.open ('example.bin', ios:out);"],
    answer: "myfile.open ('example.bin', ios::out);"
},
{
    question: "For reading the data from external source to the program we use ________ stream",
    options: ["Input stream", "output stream", "IO stream", "None of the above"],
    answer: "Input stream"
},

]


const questionset2 = [
    {
        question: "Which of the following syntax is correct to open a file using constructors",
        options: ["a) ofstream EntryFile('FewLines.dat');", "ifstream ifs();", "ofstream:EntryFile('FewLines.txt');", "ofstream:EntryFile('FewLines.txt');"],
        answer: "a) ofstream EntryFile('FewLines.dat');"
    },
    {
        question: "Which operator is used to extract the data into file?",
        options: [">>", "<<", "<", "None of the above"],
        answer: ">>"
    },
    {
        question: "Which of the following syntax is correct to close a file",
        options: ["ifs.close(“file1.txt”);", "ifs::close(“file1.txt”);", "ifs.close();", "ifs:close(“file1.txt”);"],
        answer: "ifs.close();"
    },
    {
        question: "Which of the following mode is used to open a file in binary mode?",
        options: ["ios::bin", "ios::binary", "ios::bins", "None of the above"],
        answer: "ios::binary"
    },
    {
        question: "What is the use of ios::trunc mode?",
        options: ["To open a file in input mode", "To open a file in output mode", "To truncate an existing file to half", "To truncate an existing file to zero"],
        answer: "To truncate an existing file to zero"
    },
    {
        question: "What is the return type open() method?",
        options: ["int", "char", "bool", "float"],
        answer: "bool"
    },
    {
        question: "Which of the following is the default mode of the opening using the ifstream class?",
        options: ["ios::in ", "ios::out ", " ios::app", "ios::trunc"],
        answer: "ios::in "
    },
    {
        question: "Which is correct syntax?",
        options: ["myfile:open ('example.bin', ios::out);", "myfile.open ('example.bin', ios::out);", "myfile::open ('example.bin', ios::out);", "myfile.open ('example.bin', ios:out);"],
        answer: "myfile.open ('example.bin', ios::out);"
    },
    {
        question: "For writing the data from program to the external source, we use ________ stream",
        options: ["Input stream", "output stream", "IO stream", "None of the above"],
        answer: "output stream"
    }

]



const questionset1written = [
    {
        question: "Write a C++ code to transfer the data(your name, USN and dept) entering from the keyboard to the text file"
    },
    {
        question: "Write a C++ code to read the data (your name, USN and dept) which is present in binary file and display it on console window. "
    },
    {
        question: "What is the command to append a string to the existing file?"
    }
    
]

const questionset2written = [
    {
        question: "Write a C++ code to transfer the data(your name, USN and dept) from the text file to a program and to display it on the console window."
    },
    {
        question: "Write a C++ code to transfer the data (your name, USN and dept) entering from the keyboard to the binary file"
    },
    {
        question: "Which are the two ways to open a file in file handling streams?"
    }
    
]


export {questionset1, questionset2, questionset1written, questionset2written}
