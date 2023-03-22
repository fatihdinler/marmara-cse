import unittest

class TestTranscript (unittest.TestCase):

#This method tests the method in which the student's overall academic average is 
#calculated by converting the letter grade received by the student to the double number value."""


    def test_grade_change_to_double(self):
        try : 
            # create a test object
            test_grade = TestTranscript()

            # test the AA case
            result = test_grade.grade_change_to_double("AA")
            self.assertEqual(result, 4)

            # test the BA case
            result = test_grade.grade_change_to_double("BA")
            self.assertEqual(result, 3.5)

            # test the BB case
            result = test_grade.grade_change_to_double("BB")
            self.assertEqual(result, 3)

            # test the CB case
            result = test_grade.grade_change_to_double("CB")
            self.assertEqual(result, 2.5)

            # test the CC case
            result = test_grade.grade_change_to_double("CC")
            self.assertEqual(result, 2)

            # test the DC case
            result = test_grade.grade_change_to_double("DC")
            self.assertEqual(result, 1.5)

            # test the DD case
            result = test_grade.grade_change_to_double("DD")
            self.assertEqual(result, 1)

            # test the FD case
            result = test_grade.grade_change_to_double("FD")
            self.assertEqual(result, 0.5)

            # test the FF case
            result = test_grade.grade_change_to_double("FF")
            self.assertEqual(result, 0)
            
        except Exception as error :
            print('Error is occurred with test_grade_change_to_double : ' , str(error))
