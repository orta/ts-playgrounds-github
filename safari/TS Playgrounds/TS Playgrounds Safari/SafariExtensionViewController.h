//
//  SafariExtensionViewController.h
//  TS Playgrounds Safari
//
//  Created by Orta Therox on 7/29/19.
//  Copyright © 2019 Orta Therox. All rights reserved.
//

#import <SafariServices/SafariServices.h>

@interface SafariExtensionViewController : SFSafariExtensionViewController

+ (SafariExtensionViewController *)sharedController;

@end
