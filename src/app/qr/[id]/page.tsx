import { getAllConditionsForProfile, getProfileForUser } from "@/backend/profile";
import { getQrCodeWithUuid } from "@/backend/qr-code";
import { getUser } from "@/backend/user";
import QRCodeComponent from "@/components/code";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { H2 } from "@/components/typography";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: `${process.env.GEMINI_API_KEY}` });

const prisma = new PrismaClient();

export default async function QrSlugPage({
    params,
    }: {
    params: Promise<{ id: string }>;
    }) {
    // This page is for QR code scanning and will handle the logic for it
    // You can implement QR code scanning logic here
    const { id: uuid } = await params;

    const gottenQrCode = await getQrCodeWithUuid(uuid);

    if (!gottenQrCode) {
        notFound();
    }

    const user = await getUser(gottenQrCode.userId);

    const defaultQuestions = [
        "What are the most important health concerns I should be aware of based on my health history?",
        "Are there any specific lifestyle changes you would recommend to improve my health?",
        "Given my health profile, are there any screenings or preventive measures I should consider?",
        "How can I better manage my current health conditions?",
        "What symptoms or changes should I watch for that might indicate a problem?",
        "Are there any medications or treatments that you would recommend based on my health history?",
    ];

    let questionsForHealthcareProviders = defaultQuestions;
    let healthScoreForPatient;

    let questionsResponse;
    let scoreResponse;

    if (!user) {
        // If the user does not exist, return a 404
        notFound();
    } else {
        const uId = user.id;
        
        if (uId) {
          try {
            const entries = await prisma.journalEntry.findMany({
                where: { userId: uId },
                orderBy: { entryDate: "desc" }
            });

            const generateQuestionsPrompt = "\nUsing the above user data as context for a patient profile, particularly focusing on the medication taken on a certain day, the corresponding symptoms experienced on a certain day, the sleep had on a certain day, and the other notes mentioned, generate a list of five specific, coherent, and productive questions taken from the perspective of the patient that the patient can use to ask their primary care physician at their next appointment. The end goal of these questions is to enable the patient to receive the best care possible by advocating for their health education and wellness awareness. It should be straight to the point, do not say \"Okay, ...\" SIMPLY SEPARATE YOUR QUESTIONS BY QUESTION  MARKS"
            const generateHealthScorePrompt = "\nUsing the above user data as context for a patient profile, particularly focusing on daily symptom, medication, and sleep data, generate a short and concise paragraph summarizing the user's health. The summary should highlight key observations, potential concerns, and any recommendations for the patient to consider. Ensure the tone is caring and supportive, aiming to help the patient receive the best care possible."
            
            let entriesData = entries.map(entry => {
                return `Entry Date: ${entry.entryDate.toISOString()}
                Title: ${entry.entryTitle}
                Medications Taken: ${entry.medicationsTaken || "None"}
                Symptoms Had: ${entry.symptomsHad || "None"}
                Sleep: ${entry.sleep ? entry.sleep.toString() + " hours" : "Not recorded"}
                Other Notes: ${entry.otherNotes || "No additional notes"}
                `;
            }).join("\n")

            if (entries.length === 0) {
                // If there are no entries, return a default message
                entriesData = "No journal entries found for this user. Please ensure you have logged your health information.";
            }

            const questionsPrompt = entriesData + generateQuestionsPrompt;
            const healthScorePrompt = entriesData + generateHealthScorePrompt;

            if (gottenQrCode.shareHealthLogs === true) {
                questionsResponse = await ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents: [
                        {
                            role: "You are a medical AI assistant. Your task is to generate questions for healthcare providers based on the provided health information. The goal is to help patients advocate for their health and wellness. You will ask questions that are specific, coherent, and productive, focusing on the patient's health history and current status. Separate your questions by question marks. Ensure that the questions are relevant to the patient's health information and can facilitate meaningful discussions with healthcare providers. These questions should also think about medical error and questions that people don't often think about. The whole idea is patient safety and making sure patients learn more about the healthcare system because they don't learn it in school.\n\n" +
                            // This is the prompt for generating questions
                            // The context provided will be the journal entries
                            entriesData + "\n\n",
                            text: questionsPrompt,
                            
                        }
                    ]
                    
                });
    
                scoreResponse = await ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents: [
                        {
                            role: "You are a medical AI assistant. Your task is to generate a health summary for the patient based on the provided health information. The goal is to provide a concise and supportive summary that highlights key observations and potential concerns. Use the following information to generate the health summary:\n\n \n" +
                            // This is the prompt for generating health summary
                            // The context provided will be the journal entries
                            entriesData + "\n\n",
                            text: healthScorePrompt,
                        }
                    ]
                });
            }

            questionsForHealthcareProviders = (questionsResponse?.text ?? '').split('?').filter((val) => val.trim() !== "").map((val) => `${val}?`) || defaultQuestions;
            
            healthScoreForPatient = scoreResponse?.text;

          } catch (error) {
              console.error("Error fetching journal entries:", error);
          }
        }
        else {
            console.log("TEST")
        }
    }

    const profile = await getProfileForUser(gottenQrCode.userId);
    if (!profile) {
        // If the profile does not exist, return a 404
        // This means the user has not completed their profile
        notFound();
    }

    // At this point, you have a valid QR code and user
    // You can now return the QR code component or any other relevant information

    const age = profile.dateOfBirth
    ? Math.floor(
        (new Date().getTime() - new Date(profile.dateOfBirth).getTime()) / 
        (1000 * 60 * 60 * 24 * 365.25) // Calculate age in years
    )
    : null; // Handle the case where dateOfBirth is not provided

    

    const medicalHistory = await getAllConditionsForProfile(profile.id);

    return (
      
        <div className="text-center mb-4 flex items-center flex-col gap-2 pt-16 max-w-xl mx-auto px-12 md:px-0">
          <Link
          href={'/'}
          >
            <Image
            src={"/logos/logo.svg"}
            alt={"Health Profile Logo"}
            width={80}
            height={80}
            className={"grayscale opacity-50"}
            />
          </Link>
          
          <h1 className="text-2xl font-bold">Health Profile</h1>
         
         <H2 className="text-xl font-semibold text-gray-700">
            Patient Information
        </H2>
        
        <Table
        className={'max-w-xl w-full mx-auto mt-4 border border-gray-300 rounded-md shadow-md'}
        >
            <TableCaption>
                This table contains the health information associated with the QR code scanned. 
                Please ensure that you have permission to access this information.
                <br />
                <br />
                Note: This information is confidential and should be handled with care.
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Field</TableHead>
                    <TableHead className="text-left">Value</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="w-[150px]">Full Name</TableCell>
                    <TableCell className="text-left">
                        {gottenQrCode.shareName ?
                        `${user.name}`
                        :
                        // If the user has not provided permission to share their full name
                        "Not provided"
                        }
                    </TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="w-[150px]">Date of Birth</TableCell>
                    <TableCell className="text-left">
                        {gottenQrCode.shareDateOfBirth ?
                        `${profile.dateOfBirth ? `${new Date(profile.dateOfBirth).toLocaleDateString()} (${age ?? 0} years old)` : "Not provided"}`
                        :
                        // If the user has not provided permission to share their full name
                        "Not provided"
                        }
                    </TableCell>
                </TableRow>
               
            </TableBody>
        </Table>

        <H2 className="text-xl font-semibold text-gray-700">
            Health History
        </H2>
        
        <ul className="list-disc list-inside max-w-xl w-full mx-auto mt-4 text-left space-y-4">
            {(medicalHistory.length > 0 && gottenQrCode.shareMedicalHistory === true) ? (
                medicalHistory.map((condition, index) => (
                    <li key={index} className="text-gray-700 bg-neutral-100 p-2 rounded-md mb-2 shadow-sm">
                        <strong>{condition.condition}</strong>
                        {condition.notes && (
                            <span className="text-sm text-gray-500">
                                {" - Notes: "}{condition.notes}
                            </span>
                        )}
                        {condition.diagnosedDate && (
                            <span className="text-sm text-gray-500">
                                {" - Diagnosed on: "}{new Date(condition.diagnosedDate).toLocaleDateString()}
                            </span>
                        )}
                        {condition.status && (
                            <span className="text-sm text-gray-500">
                                {" - Status: "}{condition.status}
                            </span>
                        )}
                        {/* You can add more details here based on your requirements */}
                    </li>
                ))
            ) : (
                gottenQrCode.shareMedicalHistory === true ? (
                <li className="text-gray-500 bg-neutral-100 p-4 rounded-md mb-2 shadow-sm">
                    No medical conditions reported. 
                    <br />
                    (This means the patient has not provided any medical history or conditions)
                </li>
                ) : (
                    <li className="text-gray-500 bg-neutral-100 p-4 rounded-md mb-2 shadow-sm">
                    Medical history is private.
                </li>
                )
            )}
        </ul>

        <H2 className="text-xl font-semibold text-gray-700">
            AI Generated Health Summary
        <br />
        <span className="text-sm text-gray-500">
            (This is an AI generated summary based on the provided health information)
        </span>
        <br />
        <span className="text-sm text-gray-500">
            (Please note that this summary is generated by an AI model and should not be used as a substitute for professional medical advice)
        </span>
        <br />
        <span className="text-sm text-gray-500">
            (This summary is for informational purposes only and should not be considered a diagnosis or treatment plan)
        </span>
        <br />
        <span className="text-sm text-gray-500">
            (Always consult with a qualified healthcare provider for any medical concerns or questions)
        </span>
        </H2>
        
        <Table
        className={'max-w-xl w-full mx-auto mt-4 border border-gray-300 rounded-md shadow-md'}
        >
            <TableCaption>
                This table contains the AI generated health summary based on the provided health information. 
                Please ensure that you have permission to access this information.
                <br />
                <br />
                Note: This summary is generated by an AI model and should not be used as a substitute for professional medical advice.
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Summary</TableHead>
                    <TableHead className="text-left">Value</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="w-[150px]">Health Summary</TableCell>
                    <TableCell className="text-left break-words text-wrap">
                        { gottenQrCode.shareHealthLogs === true ? healthScoreForPatient : "Not provided" }
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        
        <H2 className="text-xl font-semibold text-gray-700 mt-4">
            AI Generated Questions for Healthcare Providers
        <br />
        <span className="text-sm text-gray-500">
            (These questions are generated by an AI model to help facilitate discussions with healthcare providers)
        </span>
        <br />
        <span className="text-sm text-gray-500">
            (These questions are intended to help you get the most out of your healthcare visit)
        </span>
        <br />
        <span className="text-sm text-gray-500">
            (Please note that these questions are generated based on the provided health information and may not cover all aspects of your health)
        </span>
        </H2>

        <Table
        className={'w-full mx-auto mt-4 border border-gray-300 rounded-md shadow-md'}
        >
            <TableCaption>
                This table contains AI generated questions for healthcare providers based on the provided health information. 
                Please ensure that you have permission to access this information.
                <br />
                <br />
                Note: These questions are generated by an AI model to help facilitate discussions with healthcare providers.
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Question</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {questionsForHealthcareProviders.map((question, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-left text-wrap break-words">
                            {question}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        <Button
            className="mt-4"
            variant="solid"
            
        >
            Print this Page
        </Button>

        <div className="mt-4">
            <QRCodeComponent
                value={gottenQrCode}
                link={`${process.env.BASE_URL}/qr/${uuid}`} // This will be the URL to access this QR code
            />
            <p className="text-sm text-muted-foreground mt-2">Scan this QR code to access this health profile.</p>
            
        </div>
    </div>
    );
}